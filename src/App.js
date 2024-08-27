import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './Auth/Auth';
import Chat from './components/Chat/ChatApp';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar/Navbar';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
          <Routes>
            {/* Ruta para autenticación */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Auth />} />

            {/* Ruta para el chat protegida */}
            <Route path="/chat" element={
              <>
                <Navbar />  {/* Muestra el Navbar solo en la ruta /chat */}
                <PrivateRoute element={<Chat />} />
              </>
            } />

            {/* Redirige desde la raíz a la ruta de autenticación */}
            <Route path="/" element={<Auth />} />
          </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
