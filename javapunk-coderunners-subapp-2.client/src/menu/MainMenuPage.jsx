import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../components/Layout.css";

function MainMenuPage() {
    const navigate = useNavigate();
    const { isAdmin, user } = useAuth();

    return (
        <div className="container main-box centered main-menu">
            <h1>Main Menu</h1>
            
            {!isAdmin && (
                <>
                    <div className="log-in-success text-success-custom"> You are logged in as {user?.unique_name}.</div>
                    <div className="menu-buttons">
                        <button className="btn btn-primary" onClick={() => navigate("/modules")}>
                            Modules
                        </button>
                        <button className="btn btn-primary" onClick={() => navigate("/exam")}>
                            Exam
                        </button>
                    </div>
                </>
            )}

            {isAdmin && (
                <>
                    <div className="log-in-success text-success-custom"> You are logged in as admin.</div>
                        <button className="btn btn-primary" onClick={() => navigate("/admin/modules")}>
                            Module Options
                        </button>
                        <button className="btn btn-primary" onClick={() => navigate("/admin/questions")}>
                            Question Options
                        </button>
                </>
            )}
        </div>
    );
}

export default MainMenuPage;