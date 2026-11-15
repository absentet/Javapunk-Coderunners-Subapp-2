import { GetQuestions } from "../api/qnacrudapi";
import Button from "../components/Button";
import "../components/Layout.css";
import { useNavigate } from "react-router-dom";

// Page where admin can navigate question options.

function QnAOptionsPage() {
    const navigate = useNavigate();

    function handleCreateQuestionClick() {
        navigate("/admin/questions/create")
    }

    function handleEditQuestionClick() {
        navigate("/admin/questions/edit")
    }

    function handleDeleteQuestionClick() {
        navigate("/admin/questions/delete")
    }

    function handleAdminOptionsClick() {
        navigate("/admin/options")
    }

    return (
        <div className="auth-page">
            <div className="container-options">
                <Button className="btn-primary btn-option" onClick={handleCreateQuestionClick}>
                    Create Question
                </Button>
                <Button className="btn-primary btn-option" onClick={handleEditQuestionClick}>
                    Edit Questions
                </Button>
                <Button className="btn-primary btn-option" onClick={handleDeleteQuestionClick}>
                    Delete Questions
                </Button>   
                <Button className="btn-primary btn-option" onClick={handleAdminOptionsClick}>
                    Back to Options
                </Button>
            </div>
        </div>
    );
}

export default QnAOptionsPage;