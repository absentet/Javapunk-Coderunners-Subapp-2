import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetModuleWithId, UpdateModule } from "../api/modulecrudapi";

function EditModulePage() {
    const navigate = useNavigate();
    const { moduleId } = useParams();
    const [module, setModule] = useState(null);
    const [loadedModuleId, setLoadedModuleId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        let cancelled = false;

        GetModuleWithId(moduleId)
            .then((data) => {
                if (!cancelled) {
                    setModule(data);
                    setError("");
                }
            })
            .catch((requestError) => {
                if (!cancelled) {
                    setModule(null);
                    setError(requestError.message);
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoadedModuleId(moduleId);
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [moduleId]);

    function handleModuleClick() {
        navigate("/admin/modules");
    }

    async function handleEditModule(event) {
        event.preventDefault();
        setError("");
        setSuccess("");

        const form = event.currentTarget;
        const formData = new FormData(form);
        const updatedModule = {
            id: module.id,
            name: formData.get("moduleName"),
        };

        try {
            await UpdateModule(updatedModule);
            setSuccess("Module updated successfully.");
        } catch (requestError) {
            setError(requestError.message);
        }
    }

    const isLoading = loading || loadedModuleId !== moduleId;
    const currentError = loadedModuleId === moduleId ? error : "";

    return (
        <div className="container-options">
            <h1>Edit Module</h1>
            {isLoading && <p>Loading module...</p>}
            {module && !isLoading && (
                <form onSubmit={handleEditModule} className="form-container">
                    <div className="form-group">
                        <label htmlFor="moduleId">Module id</label>
                        <input type="number" className="form-control" id="moduleId" name="moduleId" defaultValue={module.id} required disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="moduleName">Module Name</label>
                        <input type="text" className="form-control" id="moduleName" name="moduleName" defaultValue={module.name} required />
                    </div>
                    <button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
                </form>
            )}

            {currentError && <p role="alert">{currentError}</p>}
            {success && <p role="status">{success}</p>}
            {!isLoading && !module && !currentError && <p role="alert">Module not found.</p>}

            <p>
                <button type="button" className="btn-primary btn" onClick={handleModuleClick}>
                    Back to Options
                </button>
            </p>
        </div>
    );
}

export default EditModulePage;