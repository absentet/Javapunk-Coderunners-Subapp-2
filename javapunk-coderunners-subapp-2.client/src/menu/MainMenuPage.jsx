import { useNavigation } from "react-router-dom";
import "../components/Layout.css";

function MainMenuPage() {
    const navigate = useNavigation();
    const isAdmin = false; // Placeholder for admin check, replace with actual logic

    return (
        <div className="container main-box centered">
            <h1>Main Menu</h1>
            // Add "you are logged in as" message here, with username and role
            
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