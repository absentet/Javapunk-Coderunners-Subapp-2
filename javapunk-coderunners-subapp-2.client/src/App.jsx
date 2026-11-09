import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './components/Layout';
import './App.css';

function App() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="App">
            <Layout blurred={!isHome}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Layout>
        </div>
    );
}
export default App;