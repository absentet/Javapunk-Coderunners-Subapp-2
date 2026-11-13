//Page to create new user account.
function RegisterPage() {
    return (
        <div className="auth-page">
            <div className="container main-box centered">
                <form>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                    <br />
                    <br />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                    <br />
                    <br />

                    <button type="button" className="btn btn-primary">
                        Create User
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;