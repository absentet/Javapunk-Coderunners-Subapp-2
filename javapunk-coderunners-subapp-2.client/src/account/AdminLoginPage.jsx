import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

//Admin login page for administrators to access the admin modules page

function AdminLoginPage() {
    const navigate = useNavigate();
    const { loginAdmin } = useAuth();

    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            await loginAdmin(password);
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
                        type="submit" 
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