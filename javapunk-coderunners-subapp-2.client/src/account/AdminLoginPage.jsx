//Admin login page for administrators to access the admin modules page
function AdminLoginPage() {
    return (
        <div className="auth-page">
            <div className="container main-box centered">
                <h2>Admin Login</h2>
                <form>
                    
                    <label htmlFor="password">Admin password:</label>
                    <input type="password" id="password" name="password" required />
                    <br />
                    <br />

                    <button type="button" className="btn btn-primary">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}
export default AdminLoginPage;