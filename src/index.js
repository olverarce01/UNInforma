import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Inicio from './App';
import ContenedorNoticias from './components/ContenedorNoticias';
import ContenedorNoticia from './components/ContenedorNoticia';
import SignUp from './components/SignUp';
import { AuthProvider } from './context/authContext';
import Login from './components/Login';

import reportWebVitals from './reportWebVitals';

import './firebase';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ProtectedRoute } from './ProtectedRoute';
import CrearNoticia from './components/CrearNoticia';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route exact path="/" element={
              <ProtectedRoute>
                  <Inicio />
              </ProtectedRoute>
              }
            />
            <Route exact path="/noticias/:id" element={<ContenedorNoticias/>} />  
            <Route exact path="/noticias/:id/:id2" element={<ContenedorNoticia/>} />  
            <Route exact path="/signup" element={<SignUp/>} />  
            <Route exact path="/login" element={<Login/>} />  
            <Route exact path="/crearNoticia/:id" element={<CrearNoticia/>} />  
            
            

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
