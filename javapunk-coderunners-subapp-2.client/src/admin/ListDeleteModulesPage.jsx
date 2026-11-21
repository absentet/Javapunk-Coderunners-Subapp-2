import { useEffect, useState } from "react";
import { DeleteModule, GetModules } from "../api/modulecrudapi";
import { useNavigate } from "react-router-dom";

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
                            <button onClick={() => handleDeleteModule(module.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default ListDeleteModulesPage;