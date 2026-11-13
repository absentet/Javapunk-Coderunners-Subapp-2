import Button from "../components/Button";
import "../components/Layout.css";
import { useNavigate } from "react-router-dom";
//import { useState } from "react";

function LoginChoicePage() {
    const navigate = useNavigate();
    //Må lage en state for å holde styr på om man er logget inn eller ikke, og hvilken bruker som er logget inn.
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