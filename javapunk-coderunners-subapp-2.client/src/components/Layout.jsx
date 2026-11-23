import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Layout({ children, blurred = true }) {
    const { token, user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div>
            <div className={blurred ? "bg bg-blur" : "bg"}></div>
            {token && (
                <div className="topbar">
                    <span className="topbar-user">
                        {isAdmin ? "Admin" : user?.unique_name}
                    </span>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </div>
            )}

            <div className="content">
                {children}
            </div>
        </div>
    );
}

export default Layout;