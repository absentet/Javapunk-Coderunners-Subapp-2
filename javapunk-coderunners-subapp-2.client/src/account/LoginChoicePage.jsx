import Button from "../components/Button";
import "../components/Layout.css";
import { useNavigate } from "react-router-dom";

//Page that gives the option to login as user, create a user or login as admin

function LoginChoicePage() {
    const navigate = useNavigate();
    return (
        <div className="auth-page">
            <div className="container container-login">
                <Button 
                    className="btn btn-primary"
                    onClick={() => navigate("/login/user")}
                >
                    LOG IN
                </Button>

                <p>or...</p>
                
                <Button 
                    className="btn btn-primary"
                    onClick={() => navigate("/register")}
                >
                    CREATE USER
                </Button>
            </div>

            <div className="container container-login">
                <Button 
                    className="btn btn-primary"
                    onClick={() => navigate("/login/admin")}
                >
                    ADMIN LOGIN
                </Button>
            </div>
        </div>
    );
}

export default LoginChoicePage;