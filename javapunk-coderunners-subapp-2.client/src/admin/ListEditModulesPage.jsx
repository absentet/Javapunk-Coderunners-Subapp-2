import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetModules } from "../api/modulecrudapi";

function ListEditModulesPage() {
    const navigate = useNavigate();
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        GetModules()
            .then(setModules)
            .catch((requestError) => setError(requestError.message))
            .finally(() => setLoading(false));
    }, []);

    function handleEditModuleClick(moduleId) {
        navigate("" + moduleId);
    }

    return (
        <section className="module-list">
            <h2>Modules</h2>
            {loading && <p>Loading modules...</p>}
            {error && <p role="alert">{error}</p>}
            {!loading && !error && modules.length === 0 && <p>No modules found.</p>}
            {!loading && !error && modules.length > 0 && (
                <ul>
                    {modules.map((module, moduleIndex) => (
                        <li key={`${module.id}-${moduleIndex}`}>
                            <p>{module.name}</p>
                            <button onClick={() => handleEditModuleClick(module.id)}>Edit</button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default ListEditModulesPage;