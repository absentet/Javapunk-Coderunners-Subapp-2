import { useEffect, useState } from "react";
import { GetQuestionWithId, UpdateQuestion } from "../api/qnacrudapi";
import { useNavigate, useParams } from "react-router-dom";

function EditQuestionPage() {
    const navigate = useNavigate();
    const { questionId } = useParams();
    const [question, setQuestion] = useState(null);
    const [loadedQuestionId, setLoadedQuestionId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        let cancelled = false;

        GetQuestionWithId(questionId)
            .then((data) => {
                if (!cancelled) {
                    setQuestion(data);
                    setError("");
                }
            })
            .catch((requestError) => {
                if (!cancelled) {
                    setQuestion(null);
                    setError(requestError.message);
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoadedQuestionId(questionId);
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [questionId]);

    function handleQuestionClick() {
        navigate("/admin/questions");
    }

    async function handleEditQuestion(event) {
        event.preventDefault();
        setError("");
        setSuccess("");

        const form = event.currentTarget;
        const formData = new FormData(form);
        const question = {
            moduleId: Number(formData.get("moduleId")),
            questionText: formData.get("questionText"),
            answers: [
                { answerText: formData.get("correctAnswer"), isCorrect: true },
                { answerText: formData.get("wrongAnswer1"), isCorrect: false },
                { answerText: formData.get("wrongAnswer2"), isCorrect: false },
                { answerText: formData.get("wrongAnswer3"), isCorrect: false },
            ],
        };

        try {
            await UpdateQuestion(question, questionId);
            setSuccess("Question updated successfully.");
        } catch (requestError) {
            setError(requestError.message);
        }
    }

    const isLoading = loading || loadedQuestionId !== questionId;
    const currentError = loadedQuestionId === questionId ? error : "";
    const correctAnswer = question?.answers?.find((answer) => answer.isCorrect)?.answerText ?? "";
    const wrongAnswers = question?.answers?.filter((answer) => !answer.isCorrect).map((answer) => answer.answerText) ?? [];

    return (
        <div className="container-options">
            <h1>Edit Question</h1>
            {isLoading && <p>Loading question...</p>}
            {question && !isLoading && (
                <form onSubmit={handleEditQuestion} className="form-container">
                    <div className="form-group">
                        <label htmlFor="moduleId">Module (1-5)</label>
                        <input type="number" min="1" max="5" step="1" className="form-control" id="moduleId" name="moduleId" defaultValue={question.moduleId} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="questionText">Question Text</label>
                        <input type="text" className="form-control" id="questionText" name="questionText" defaultValue={question.questionText} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="correctAnswer">Correct Answer</label>
                        <input type="text" className="form-control" id="correctAnswer" name="correctAnswer" defaultValue={correctAnswer} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="wrongAnswer1">Wrong Answer 1</label>
                        <input type="text" className="form-control" id="wrongAnswer1" name="wrongAnswer1" defaultValue={wrongAnswers[0] ?? ""} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="wrongAnswer2">Wrong Answer 2</label>
                        <input type="text" className="form-control" id="wrongAnswer2" name="wrongAnswer2" defaultValue={wrongAnswers[1] ?? ""} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="wrongAnswer3">Wrong Answer 3</label>
                        <input type="text" className="form-control" id="wrongAnswer3" name="wrongAnswer3" defaultValue={wrongAnswers[2] ?? ""} required />
                    </div>
                    <button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
                </form>
            )}

            {currentError && <p role="alert">{currentError}</p>}
            {success && <p role="status">{success}</p>}
            {!isLoading && !question && !currentError && <p role="alert">Question not found.</p>}

            <p>
                <button type="button" className="btn-primary btn" onClick={handleQuestionClick}>
                    Back to Options
                </button>
            </p>
        </div>
    );
}

export default EditQuestionPage;