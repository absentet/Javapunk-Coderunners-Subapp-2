import { useEffect, useState } from "react";
import { GetQuestions } from "../api/qnacrudapi";
import { DeleteQuestion } from "../api/qnacrudapi";
import { useNavigate } from "react-router-dom";

function ListDeleteQuestionsPage() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        GetQuestions()
            .then(setQuestions)
            .catch((requestError) => setError(requestError.message))
            .finally(() => setLoading(false));
    }, []);

    async function handleDeleteQuestion(questionId) {
        setError("");

        try {
            await DeleteQuestion(questionId);
            navigate(0);
        } catch (requestError) {
            setError(requestError.message);
        }
    }
    function handleBackToOptionsClick() {
        navigate("/admin/questions");
    }

    return (
        <section className="question-list">
            <h2>Questions</h2>
            {loading && <p>Loading questions...</p>}
            {error && <p role="alert">{error}</p>}
            {!loading && !error && questions.length === 0 && <p>No questions found.</p>}
            {!loading && !error && questions.length > 0 && (
                <ul>
                    {questions.map((question, questionIndex) => (
                        <li key={`${question.moduleId}-${questionIndex}`}>
                            <p>{question.questionText}</p>
                            <ul>
                                {question.answers.map((answer, answerIndex) => (

                                    <li key={answerIndex}>
                                        {answer.answerText}{answer.isCorrect ? " (Correct)" : ""}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => handleDeleteQuestion(question.questionId)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            <p>
                <button type="button" className="btn-primary btn" onClick={handleBackToOptionsClick}>
                    Back to Options
                </button>
            </p>
        </section>
    );
}

export default ListDeleteQuestionsPage;