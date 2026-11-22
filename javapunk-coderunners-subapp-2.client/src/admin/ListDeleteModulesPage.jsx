import { useEffect, useState } from "react";
import { DeleteModule, GetModules } from "../api/modulecrudapi";
import { useNavigate } from "react-router-dom";
import "./AdminList.css";
import "../components/Layout.css";

function ListDeleteModulesPage() {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        GetModules()
            .then(setModules)
            .catch((requestError) => setError(requestError.message))
            .finally(() => setLoading(false));
    }, []);

    async function handleDeleteModule(moduleId) {
        setError("");

        try {
            await DeleteModule(moduleId);
            navigate(0);
        } catch (requestError) {
            setError(requestError.message);
        }
    }
    function handleBackToOptionsClick() {
        navigate("/admin/modules");
    }

    return (
        <div className="admin-list-page">
            <section className="container main-box admin-list">
                <h2>Modules</h2>
                {loading && <p>Loading modules...</p>}
                {error && <p role="alert">{error}</p>}
                {!loading && !error && modules.length === 0 && <p>No modules found.</p>}
                {!loading && !error && modules.length > 0 && (
                    <ul className="admin-list-items">
                        {modules.map((module, moduleIndex) => (
                            <li className="admin-list-item" key={`${module.id}-${moduleIndex}`}>
                                <p className="admin-list-label">{module.name}</p>
                                <button className="btn btn-primary btn-danger" onClick={() => handleDeleteModule(module.id)}>
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

export default ListDeleteModulesPage;