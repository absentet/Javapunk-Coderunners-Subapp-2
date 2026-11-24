import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import AdminLoginPage from './account/AdminLoginPage';
import LoginChoicePage from './account/LoginChoicePage';
import LoginPage from './account/LoginPage';
import RegisterPage from './account/RegisterPage';
import AdminOptionsPage from './admin/AdminOptionsPage';
import ModuleOptionsPage from './admin/ModulesOptionsPage';
import CreateQuestionPage from './admin/CreateQuestionPage';
import CreateModulePage from './admin/CreateModulePage';
import EditQuestionPage from './admin/EditQuestionPage';
import EditModulePage from './admin/EditModulePage';
import ListDeleteQuestionsPage from './admin/ListDeleteQuestionsPage';
import ListDeleteModulesPage from './admin/ListDeleteModulesPage';
import ListEditQuestionsPage from './admin/ListEditQuestionsPage';
import ListEditModulesPage from './admin/ListEditModulesPage';
import QnAOptionsPage from './admin/QnAOptionsPage';
import MainMenuPage from './menu/MainMenuPage';
import ModuleListPage from './modules/ModulesListPage';
import QuizPage from './quiz/QuizPage';
import { AuthProvider } from './auth/AuthContext';
import Layout from './components/Layout';
import HomePage from './home/HomePage';

const queryClient = new QueryClient();

function QuizRoute() {
    const { moduleId } = useParams();
    return <QuizPage key ={moduleId} />;
}

function App() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <QueryClientProvider client ={queryClient}>
            <AuthProvider>
                <div className="App">
                    <Layout blurred={!isHome}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginChoicePage />} />
                            <Route path="/login/user" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/login/admin" element={<AdminLoginPage />} />
                            <Route path="/menu" element={<MainMenuPage />} />
                            <Route path="/modules" element={<ModuleListPage />} />
                            <Route path="/admin/options" element={<AdminOptionsPage />} />
                            <Route path="/admin/questions" element={<QnAOptionsPage />} />
                            <Route path="/quiz/modules/:moduleId" element={<QuizRoute />} />
                            <Route path="/admin/modules" element={<ModuleOptionsPage />} />
                            <Route path="/admin/questions/create" element={<CreateQuestionPage />} />
                            <Route path="/admin/questions/edit" element={<ListEditQuestionsPage />} />
                            <Route path="/admin/questions/edit/:questionId" element={<EditQuestionPage />} />
                            <Route path="/admin/questions/delete" element={<ListDeleteQuestionsPage />} />
                            <Route path="/admin/modules/create" element={<CreateModulePage />} />
                            <Route path="/admin/modules/edit" element={<ListEditModulesPage />} />
                            <Route path="/admin/modules/edit/:moduleId" element={<EditModulePage />} />
                            <Route path="/admin/modules/delete" element={<ListDeleteModulesPage />} />
                        </Routes>
                    </Layout>
                </div>
            </AuthProvider>
        </QueryClientProvider>
    );
}
export default App;