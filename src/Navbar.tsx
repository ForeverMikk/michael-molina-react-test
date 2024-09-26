import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.module.scss'; // Usaremos Sass para los estilos

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token de autenticación del localStorage
    localStorage.removeItem('authToken');
    // Redirigir al login
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/users" className="navbar-item">Usuarios</Link>
        <Link to="/products" className="navbar-item">Productos</Link>
        <Link to="/products/create" className="navbar-item">Crear Producto</Link>
      </div>
      <div className="navbar-right">
        <button onClick={handleLogout} className="navbar-logout">
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};
