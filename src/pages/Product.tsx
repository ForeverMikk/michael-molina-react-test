import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Product.module.scss'; 

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Error al cargar el producto.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-details-container">
      <button onClick={() => navigate('/products')} className="back-button">
        Volver a productos
      </button>
      {product && (
        <>
          <h1>{product.title}</h1>
          <div className="product-details">
            <img src={product.image} alt={product.title} className="product-image" height={300} />
            <div className="product-info">
              <p><strong>Precio:</strong> ${product.price}</p>
              <p><strong>Categoría:</strong> {product.category}</p>
              <p><strong>Descripción:</strong> {product.description}</p>
              <p><strong>Rating:</strong> {product.rating.rate} / 5 ({product.rating.count} valoraciones)</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
