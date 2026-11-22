import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Layout.css";
import { CreateModule } from "../api/modulecrudapi";


// Page where admin can create a module.

function CreateModulePage() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleModuleClick() {
        navigate("/admin/modules");
    }

    async function handleCreateModule(event) {
        event.preventDefault();
        setError("");
        setSuccess("");

        const form = event.currentTarget;
        const formData = new FormData(form);
        const moduleName = formData.get("moduleName");

        try {
            await CreateModule(moduleName);
            setSuccess("Module created successfully.");
            form.reset();
        } catch (requestError) {
            setError(requestError.message);
        }
    }

    return (
        <div className="container-options">
            <h1>Create Module</h1>
            <form onSubmit={handleCreateModule} className="form-container">
                <div className="form-group">
                    <label htmlFor="moduleName">Module Name</label>
                    <input type="text" className="form-control" id="moduleName" name="moduleName" required />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Create</button>
            </form>

            {error && <p role="alert">{error}</p>}
            {success && <p role="status">{success}</p>}

            <p>
                <button type="button" className="btn-primary btn" onClick={handleModuleClick}>
                    Back to Options
                </button>
            </p>
        </div>
    );
}

export default CreateModulePage;
                