import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../components/Layout.css";

function MainMenuPage() {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();

    return (
        <div className="container main-box centered">
            <h1>Main Menu</h1>
            
            {!isAdmin && (
                <>
                    <button className="btn btn-primary" onClick={() => navigate("/modules")}>
                        Modules
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate("/exam")}>
                        Exam
                    </button>
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