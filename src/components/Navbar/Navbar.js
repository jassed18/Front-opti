import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Ajusta el archivo de estilos según sea necesario
import logo from '../../assets/images/Eslogan.png'

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/auth');  // Redirige al usuario a la página de autenticación
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <button className="logout-button" onClick={handleLogout}>
        <i className="fa fa-sign-out-alt"></i>
        <span>Salir</span>
      </button>
    </nav>
  );
};

export default Navbar;
