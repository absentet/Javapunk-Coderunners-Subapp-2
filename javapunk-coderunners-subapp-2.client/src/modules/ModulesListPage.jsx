import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getModules, getMyProgress } from "../services/moduleService";
import "../components/Layout.css";

function ModuleListPage() {
    const navigate = useNavigate();
    const [modules, setModules] = useState([]);
    const [lastCompletedModule, setLastCompletedModule] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                const moduleData = await getModules();
                setModules(moduleData);
                const progress = await getMyProgress();
                setLastCompletedModule(progress.lastCompletedModule ?? 0);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    if (isLoading) {
        return <p>Loading modules...</p>
    }

    return (
        <div className="modulesAndQuiz">
            <div className=" container main-box centered">
                <h2>Choose a module!</h2>
                <p>Score at least 60 points to unlock the next module</p>
                {errorMessage && (
                    <p className="text-danger" role="alert">{errorMessage}</p>
                )}
                <div className="module-path">
                    {modules.map((module) => {
                        const isLocked = lastCompletedModule + 1 < module.id;
                        return isLocked ? (
                            <span
                                key={module.id}
                                className="btn-primary module-button disabled-module"
                                aria-disabled="true"
                            >
                                {module.name}
                            </span>
                        ) : (
                            <button
                                key={module.id}
                                className="btn-primary module-button"
                                onClick={() => navigate(`/quiz/modules/${module.id}`)}
                            >
                                {module.name}
                            </button>
                        );
                    })}
                </div>
                <div style={{ height: "15px" }}></div>
                <button
                    className="btn btn-secondary-custom"
                    onClick={() => navigate("/menu")}
                >
                    Back to Menu
                </button>
            </div>
        </div>
    );
}

export default ModuleListPage;