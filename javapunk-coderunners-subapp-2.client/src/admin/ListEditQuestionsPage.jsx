import { useEffect, useState } from "react";
import { GetQuestions } from "../api/qnacrudapi";
import { useNavigate } from "react-router-dom";
import "./AdminList.css";
import "../components/Layout.css";

function ListEditQuestionsPage() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Search state
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedModuleId, setSelectedModuleId] = useState("");

    useEffect(() => {
        GetQuestions()
            .then(setQuestions)
            .catch((requestError) => setError(requestError.message))
            .finally(() => setLoading(false));
    }, []);

    //(search) the text and the module must both match
    const filteredQuestions = questions.filter((question) => {
        const search = searchQuery.toLowerCase();

        const matchesText =
            question.questionText.toLowerCase().includes(search) ||
            question.answers.some((answer) =>
                answer.answerText.toLowerCase().includes(search)
            );
        
        const matchesModule =
            selectedModuleId === "" || question.moduleId === Number(selectedModuleId);

        return matchesText && matchesModule;
    });

    //for dropdown (module ids that exist among the questions)
    const moduleIds = [...new Set(questions.map((question) => question.moduleId))]
        .filter((id) => id !== undefined)
        .sort((a, b) => a - b);

    function handleEditQuestionClick(questionId) {
        navigate("" + questionId);
    }

    function handleBackToOptionsClick() {
        navigate("/admin/questions");
    }

    return (
        <div className="admin-list-page">
            <section className="container main-box admin-list">
                <h2>Questions</h2>

                {!loading && !error && questions.length > 0 && (
                    <div className="search-bar">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search questions or answers"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />
                        <select
                            className="form-control"
                            value={selectedModuleId}
                            onChange={(event) => setSelectedModuleId(event.target.value)}
                        >
                            <option value="">All modules</option>
                            {moduleIds.map((id) => (
                                <option key={id} value={id}>
                                    Module {id}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {loading && <p>Loading questions...</p>}
                {error && <p role="alert">{error}</p>}
                {!loading && !error && questions.length === 0 && <p>No questions found.</p>}
                {!loading && !error && questions.length > 0 && filteredQuestions.length == 0 && (
                    <p>No questions match your search.</p>
                )}
                {!loading && !error && filteredQuestions.length > 0 && (
                    <ul className="admin-list-items">
                        {filteredQuestions.map((question) => (
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
                                    className="btn btn-primary admin-list-action"
                                    onClick={() => handleEditQuestionClick(question.questionId)}
                                >
                                    Edit
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

export default ListEditQuestionsPage;