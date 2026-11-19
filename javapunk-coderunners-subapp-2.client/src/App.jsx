import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './home/HomePage';
import LoginChoicePage from './account/LoginChoicePage';
import LoginPage from './account/LoginPage';
import RegisterPage from './account/RegisterPage';
import AdminLoginPage from './account/AdminLoginPage';
import Layout from './components/Layout';
import './App.css';
import AdminOptionsPage from './admin/AdminOptionsPage';
import QnAOptionsPage from './admin/QnAOptionsPage';
import ModuleOptionsPage from './admin/ModuleOptionsPage';
import CreateQuestionPage from './admin/CreateQuestionPage';
import ListEditQuestionsPage from './admin/ListEditQuestionsPage';
import EditQuestionPage from './admin/EditQuestionPage';
import ListDeleteQuestionsPage from './admin/ListDeleteQuestionsPage';

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
                    <Route path="/admin/options" element={<AdminOptionsPage />} />
                    <Route path="/admin/questions" element={<QnAOptionsPage />} />
                    <Route path="/admin/modules" element={<ModuleOptionsPage />} />
                    <Route path="/admin/questions/create" element={<CreateQuestionPage />} />
                    <Route path="/admin/questions/edit" element={<ListEditQuestionsPage />} />
                    <Route path="/admin/questions/edit/:questionId" element={<EditQuestionPage />} />
                    <Route path="/admin/questions/delete" element={<ListDeleteQuestionsPage />} />
                </Routes>
            </Layout>
        </div>
    );
}
export default App;