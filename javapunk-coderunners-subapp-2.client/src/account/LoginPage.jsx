//Normal login for users with an account
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { login as loginUser } from "../services/authService";
import "../components/Layout.css";

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleLogin(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const authResponse = await loginUser(username, password);
            localStorage.setItem("authToken", authResponse.token);
            localStorage.setItem("user",
                JSON.stringify({ 
                    userName: authResponse.username,
                    userId: authResponse.userId,
                })
            );

            navigate("/menu");
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }
    
    return (
        <div className="auth-page">
            <div className="container main-box centered">
                <form onSubmit={handleLogin}>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        autoComplete="username"
                        required 
                    />
                    <br />
                    <br />

                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="password"
                        required 
                    />

                    <br />
                    <br />
                    
                    //If login fails, display error message to user
                    {errorMessage && (
                        <p className="error-message">
                            {errorMessage}
                        </p>
                    )}

                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
