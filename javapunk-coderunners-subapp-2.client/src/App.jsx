import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './home/HomePage';
import LoginChoicePage from './account/LoginChoicePage';
import LoginPage from './account/LoginPage';
import RegisterPage from './account/RegisterPage';
import AdminLoginPage from './account/AdminLoginPage';
import Layout from './components/Layout';
import './App.css';

function App() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="App">
            <Layout blurred={!isHome}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginChoicePage />} />
                    <Route path="/login/user" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login/admin" element={<AdminLoginPage />} />
                </Routes>
            </Layout>
        </div>
    );
}
export default App;