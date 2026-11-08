import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './components/Layout';
import './App.css';

function App() {
    return ( 
        <Layout blurred={true}>
            <Login />
        </Layout>   
    );
}
export default App;