import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Layout from './components/Layout';
import './App.css';

function App() {
    return (
        <Layout blurred={false}>
            <Home />
        </Layout>
    )
}

export default App;