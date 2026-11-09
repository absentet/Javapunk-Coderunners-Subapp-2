import Button from "../components/Button";
import "../components/Layout.css";
//import { useState } from "react";

function Login() {
    //Må lage en state for å holde styr på om man er logget inn eller ikke, og hvilken bruker som er logget inn.
    return (
        <div className="auth-page">
            <div className="container container-login">
                <Button className="btn btn-primary">LOG IN</Button>
                <p>or...</p>
                <Button className="btn btn-primary">CREATE USER</Button>
            </div>
            <div className="container container-login">
                <Button className="btn btn-primary">ADMIN LOGIN</Button>
            </div>
        </div>
    );
}

export default Login;