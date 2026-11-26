import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getModules, getMyProgress } from "../services/moduleService";
import Button from "../components/Button";
import "../components/Layout.css";

//Page that shows the modules. For new users only one is unlocked.
//When playing through the first module and 60p are scored, the next becomes available

function ModuleListPage() {
    const navigate = useNavigate();

        const modulesQuery = useQuery({
            queryKey: ["modules"],
            queryFn: getModules,
        });

        const progressQuery = useQuery({
            queryKey: ["moduleProgress"],
            queryFn: getMyProgress,
        });

        if (modulesQuery.isLoading || progressQuery.isLoading) {
            return <p>Loading module...</p>
        }

        const modules = modulesQuery.data ?? [];
        const lastCompletedModule = progressQuery.data?.lastCompletedModule ?? 0;
        const errorMessage =
            modulesQuery.error?.message ?? progressQuery.error?.message;

 
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
                        const isLocked = module.id > lastCompletedModule + 1;
                        return (
                            <Button
                                key={module.id}
                                className={`module-button${isLocked ? " locked" : ""}`}
                                disabled={isLocked}
                                onClick={() => navigate (`/quiz/modules/${module.id}`)}
                            >
                                {module.name}
                            </Button>
                        );
                    })}
                </div>
               
                <Button
                    type="button"
                    className="btn btn-secondary-custom back-button"
                    onClick={() => navigate("/menu")}
                >
                    Back to Menu
                </Button>
            </div>
        </div>
    );
}

export default ModuleListPage;