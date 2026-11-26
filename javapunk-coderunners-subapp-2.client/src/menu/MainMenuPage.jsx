import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../components/Layout.css";

//Page that shows main menu with action options dependant on what type of user
//has logged in (user or admin)
//Normal users see Modules and Exam, admins se Module options and Question options

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