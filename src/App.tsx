import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Products } from './pages/Products';
import { CreateProduct } from './pages/CreateProduct';
import { Product } from './pages/Product';
import { User } from './pages/User';
import { useEffect } from 'react';
import { Navbar } from './Navbar'; // Importa el componente Navbar
import { Provider } from 'react-redux';
import store from './store/store';

// Placeholder component for protected routes
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirige al login si no está autenticado
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? element : null;
};

function App() {
  return (
    <>
    <Provider store={store}>
      {/* Mostrar la barra de navegación solo si el usuario está autenticado */}
      {localStorage.getItem('authToken') && <Navbar />}
      
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route path="/products" element={<ProtectedRoute element={<Products />} />} />
        <Route path="/products/create" element={<ProtectedRoute element={<CreateProduct />} />} />
        <Route path="/products/:id" element={<ProtectedRoute element={<Product />} />} />
        <Route path="/users" element={<ProtectedRoute element={<User />} />} />

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Provider>
    </>
  );
}

export default App;
