import { useState } from "react";
import { CreateQuestion } from "../api/qnacrudapi";
import "../components/Layout.css";
import { useNavigate } from "react-router-dom";

// Page where admin can create a question.

function CreateQuestionPage() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleQuestionClick() {
        navigate("/admin/questions");
    }

    async function handleCreateQuestion(event) {
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
            await CreateQuestion(question);
            setSuccess("Question created successfully.");
            form.reset();
        } catch (requestError) {
            setError(requestError.message);
        }
    }

    return (
        <div className="container-options">
            <h1>Create Question</h1>
            <form onSubmit={handleCreateQuestion} className="form-container">
                <div className="form-group">
                    <label htmlFor="moduleId">Module (1-5)</label>
                    <input type="number" className="form-control" id="moduleId" name="moduleId" required />
                </div>
                <div className="form-group">
                    <label htmlFor="questionText">Question Text</label>
                    <input type="text" className="form-control" id="questionText" name="questionText" required />
                </div>
                <div className="form-group">
                    <label htmlFor="correctAnswer">Correct Answer</label>
                    <input type="text" className="form-control" id="correctAnswer" name="correctAnswer" required />
                </div>
                <div className="form-group">
                    <label htmlFor="wrongAnswer1">Wrong Answer 1</label>
                    <input type="text" className="form-control" id="wrongAnswer1" name="wrongAnswer1" required />
                </div>
                <div className="form-group">
                    <label htmlFor="wrongAnswer2">Wrong Answer 2</label>
                    <input type="text" className="form-control" id="wrongAnswer2" name="wrongAnswer2" required />
                </div>
                <div className="form-group">
                    <label htmlFor="wrongAnswer3">Wrong Answer 3</label>
                    <input type="text" className="form-control" id="wrongAnswer3" name="wrongAnswer3" required />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Create</button>
            </form>

            {error && <p role="alert">{error}</p>}
            {success && <p role="status">{success}</p>}

            <p>
                <button type="button" className="btn-primary btn" onClick={handleQuestionClick}>
                    Back to Options
                </button>
            </p>
        </div>
    );
}

export default CreateQuestionPage;