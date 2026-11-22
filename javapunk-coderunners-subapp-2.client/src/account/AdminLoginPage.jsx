import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/authService";

//Admin login page for administrators to access the admin modules page

function AdminLoginPage() {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const result = await adminLogin(password);

            localStorage.setItem("authToken", result.token);
            localStorage.setItem("isAdmin", String(result.isAdmin));

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
                <h2>Admin Login</h2>
                {errorMessage && (
                    <div className="text-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="password">Admin password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required 
                    />

                    <br />
                    <br />

                    <button 
                        type="button" 
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Logging in..." : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default AdminLoginPage;