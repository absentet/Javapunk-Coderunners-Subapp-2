import Button from "../components/Button";
import "../components/Layout.css";
import { useNavigate } from "react-router-dom";

//Page where admin can choose between question options and module options

function AdminOptionsPage() {
    const navigate = useNavigate();

    function handleModuleClick() {
        navigate("/admin/modules");
    }

    function handleQuestionClick() {
        navigate("/admin/questions");
    }

    return (
        <div className="auth-page">
            <div className="container-options">
                <Button className="btn-primary btn-option" onClick={handleModuleClick}>
                    Module Options
                </Button>
                <Button className="btn-primary btn-option" onClick={handleQuestionClick}>
                    Question Options
                </Button>
            </div>
        </div>
    );
}

export default AdminOptionsPage;