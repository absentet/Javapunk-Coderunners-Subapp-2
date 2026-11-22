import { useEffect, useState } from "react";
import { GetQuestions } from "../api/qnacrudapi";
import { DeleteQuestion } from "../api/qnacrudapi";
import { useNavigate } from "react-router-dom";
import "./AdminList.css";
import "../components/Layout.css";

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
        <div className="admin-list-page">
            <section className="container main-box admin-list">
                <h2>Questions</h2>
                {loading && <p>Loading questions...</p>}
                {error && <p role="alert">{error}</p>}
                {!loading && !error && questions.length === 0 && <p>No questions found.</p>}
                {!loading && !error && questions.length > 0 && (
                    <ul className="admin-list-items">
                        {questions.map((question) => (
                            <li className="admin-list-item" key={question.questionId}>
                                <div className="admin-question-content">
                                    <p className="admin-list-label">{question.questionText}</p>
                                    <ul className="admin-answer-list">
                                        {question.answers.map((answer, answerIndex) => (
                                            <li
                                                className={"admin-answer"}
                                                key={answerIndex}
                                            >
                                                {answer.answerText} {answer.isCorrect ? "(Correct)" : ""}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    className="btn btn-primary btn-danger"
                                    onClick={() => handleDeleteQuestion(question.questionId)}
                                >
                                    Delete
                                </button>
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
        </div>
    );
}

export default ListDeleteQuestionsPage;