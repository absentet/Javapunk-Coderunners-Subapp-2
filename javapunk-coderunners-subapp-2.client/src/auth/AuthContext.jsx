import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import * as authService from "../services/authService";

const ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("authToken"));
    const [isLoading, setIsLoading] = useState(true);

    //Validate the token whenever it changes
    useEffect(() => {
        if (!token) {
            setUser(null);
            setIsLoading(false);
            return;
        }
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 > Date.now()) {
                setUser(decoded);
            } else {
                localStorage.removeItem("authToken");
                setUser(null);
                setToken(null);
            }
        } catch {
            localStorage.removeItem("authToken");
            setUser(null);
            setToken(null);
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    const login = async (username, password) => {
        const { token: newToken } = await authService.login(username, password);
        localStorage.setItem("authToken", newToken);
        setToken(newToken);
    };

    const loginAdmin = async (password) => {
        const { token: newToken } = await authService.adminLogin(password);
        localStorage.setItem("authToken", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        setToken(null);
    };

    const isAdmin = user?.[ROLE_CLAIM] === "Admin";
    
    return (
        <AuthContext.Provider
            value={{ user, token, isAdmin, isLoading, login, loginAdmin, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}