import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as QuizService from "../services/quizService";
import * as ModuleService from "../services/moduleService";
import QuestionCard from "./QuestionCard"
import Button from "../components/Button"
import "../components/Layout.css";

function QuizPage() {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const [correctAnswerId, setCorrectAnswerId] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [isAnswered, setIsAnswered] =useState(false);
    const [result, setResult] = useState(null);

    const { data: questions = [], isLoading, error } = useQuery({
        queryKey: ["quizQuestions", moduleId],
        queryFn: () => QuizService.getQuestionsForModule(moduleId),
        refetchOnWindowFocus: false,
    });

    const modulesQuery = useQuery({
        queryKey: ["modules"],
        queryFn: ModuleService.getModules,
    });

    const passScore = 60;
    const nextModuleId = Number(moduleId) + 1;
    const hasNextModule = (modulesQuery.data ?? [].some((m) => m.id === nextModuleId))

    //Check one answer
    const checkMutation = useMutation({
        mutationFn: ({ questionId, answerId}) =>
            QuizService.checkAnswer(questionId, answerId),
        onSuccess: (checkResult, variables) => {
            setCorrectAnswerId(checkResult.correctAnswerId);
            setIsAnswered(true);
            setAnswers((previous) => [
                ...previous,
                {
                    questionId: variables.questionId,
                    answerId: variables.answerId,
                    isCorrect: checkResult.isCorrect,
                },
            ]);
        },
    });

    //Submit the quiz
    const submitMutation = useMutation({
        mutationFn: QuizService.submitQuiz,
        onSuccess: (quizResult) => {
            setResult(quizResult);
            queryClient.invalidateQueries({ queryKey: ["moduleProgress"] });
        },
    });

    const currentQuestion = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;
    const currentScore = answers.filter((a) => a.isCorrect).length * 10;
    const errorMessage = checkMutation.error?.message ?? submitMutation.error?.message;
    const handleSubmitAnswer = (event) => {
        event.preventDefault();
        if (selectedAnswerId === null || !currentQuestion || checkMutation.isPending) {
            return;
        }
        checkMutation.mutate({
            questionId: currentQuestion.id,
            answerId: selectedAnswerId,
        });
    };

    const handleNextQuestion = () => {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswerId(null);
        setCorrectAnswerId(null);
        setIsAnswered(false);
        checkMutation.reset();
    };

    const handleFinishQuiz = () => {
        submitMutation.mutate(
            answers.map(({ questionId, answerId }) => ({ questionId, answerId }))
        );
    };

    if (isLoading) {
        return (
            <div className="container main-box">
                <p>Loading quiz questions...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container main-box">
                <p className="text-danger" role="alert">{errorMessage}</p>
                <button
                    type="button"
                    className="btn btn-secondary-custom"
                    onClick={() => navigate("/modules")}
                >
                    Back to modules
                </button>
            </div>
        );
    }

    if (result) {
        const passed = result.score >= passScore;

        return (
            <div className="modulesAndQuiz">
                <div className="score">
                    <h3>Quiz finished</h3>
                    <p>Score: {result.score}</p>
                    <p>Correct answers: {result.correctCount} / {result.totalQuestions}</p>
                </div>
                {!passed && (
                    <p>You need at least {passScore} points to unlock the next module.</p>
                )}

                <div className="question-actions">
                    <Button
                        className="btn-secondary-custom"
                        onClick={() => navigate("/modules")}
                    >
                        Back to modules
                    </Button>

                    {passed && hasNextModule && (
                        <Button
                            className="btn-secondary-custom"
                            onClick={() => navigate(`/quiz/modules/${nextModuleId}`)}
                        >
                            Next module
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    if (!currentQuestion) {
        return (
            <div className="container main-box">
                <p>No question is available for this module.</p>
            </div>
        );
    }

    return (
        <div className="modulesAndQuiz">
            <div className="score">
                <h3>Current score:</h3>
                <h3>{currentScore}</h3>
            </div>
            <div className="container main-box">
                <p>Question {currentIndex + 1} of {questions.length}</p>
                <h2>{currentQuestion.text}</h2>

                {errorMessage && (
                    <p className="text-danger" role="alert">{errorMessage}</p>
                )}

                <form onSubmit={handleSubmitAnswer}>
                    <QuestionCard
                        question={currentQuestion}
                        selectedAnswerId={selectedAnswerId}
                        onAnswerChange={setSelectedAnswerId}
                        isAnswered={isAnswered}
                        isChecking={checkMutation.isPending}
                        correctAnswerId={correctAnswerId}
                    />

                    {!isAnswered ? (
                        <button
                            type="submit"
                            className="btn btn-secondary-custom"
                            disabled={checkMutation.isPending || selectedAnswerId === null}
                        >
                            {checkMutation.isPending ? "Checking..." : "Submit"}
                        </button>
                    ) : isLastQuestion ? (
                        <button
                            type="button"
                            className="btn btn-secondary-custom"
                            onClick={handleFinishQuiz}
                            disabled={submitMutation.isPending}
                        >
                            {submitMutation.isPending ? "Finishing..." : "Finish Quiz"}
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-secondary-custom"
                            onClick={handleNextQuestion}
                        >
                            Next Question
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default QuizPage;