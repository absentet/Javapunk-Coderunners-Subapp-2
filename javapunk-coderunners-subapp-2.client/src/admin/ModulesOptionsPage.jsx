import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "../components/Layout.css";

// Page where admin can navigate module options.

function ModulesOptionsPage() {
    const navigate = useNavigate();

    function handleCreateModuleClick() {
        navigate("/admin/modules/create")
    }

    function handleEditModuleClick() {
        navigate("/admin/modules/edit")
    }

    function handleDeleteModuleClick() {
        navigate("/admin/modules/delete")
    }

    function handleAdminOptionsClick() {
        navigate("/admin/options")
    }

    return (
        <div className="auth-page">
            <div className="container-options">
                <Button className="btn-primary btn-option" onClick={handleCreateModuleClick}>
                    Create Module
                </Button>
                <Button className="btn-primary btn-option" onClick={handleEditModuleClick}>
                    Edit Modules
                </Button>
                <Button className="btn-primary btn-option" onClick={handleDeleteModuleClick}>
                    Delete Modules
                </Button>
                <Button className="btn-primary btn-option" onClick={handleAdminOptionsClick}>
                    Back to Options
                </Button>
            </div>
        </div>
    );
}

export default ModulesOptionsPage;