import { useState } from "react";
import { Link } from "react-router-dom";
import "../components/Layout.css";
import { register } from "../services/authService";
//Function to create new user account.
function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleRegister(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            await register(username, password);
            setSuccessMessage("User registered successfully! You can now log in.");
            setUsername("");
            setPassword("");
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="container main-box centered">
                <h1>Create User</h1>
                <form onSubmit={handleRegister}>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        autoComplete="username"
                        minLength={3}
                        maxLength={20}
                        required 
                    />
                    <br />
                    <br />

                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password"
                        minLength={6}
                        required 
                    />
                    <br />
                    <br />

                    {errorMessage && (
                        <p className="error-message" role="alert">
                            {errorMessage}
                        </p>
                    )}

                    {successMessage ? (
                        <div role="status">
                            <p className="success-message">{successMessage}</p>
                            <Link to="/login/user" className="btn btn-primary auth-login-button">Go to Login</Link>
                        </div>
                    ) : (
                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating user..." : "Create User"}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;