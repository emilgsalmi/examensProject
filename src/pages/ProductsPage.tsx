import React, { useEffect, useState } from 'react';
import { getProducts, Product } from '../services/firebase';
import "../styles/ProductPage/productpage.style.scss"
import { useNavigate } from 'react-router-dom';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts();
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='products-list-container'>
        <h2 className='product-list-title' style={{textDecoration:"underline"}}>
            alla produkter
        </h2>
      {products.map((product) => (
          <div style={{width:"80%"}} onClick={() => navigate(`/products/${product.name}`)}>
            <div className='products-list-wrapper'>
                <div className='productInfo'>
                    <h1>{product.name}</h1>
                    <p> Pris: {product.price}kr</p>
                    <p>Beskrivning: <br/>{product.description}</p>
                </div>
                <img src={product.imageUrl} alt={product.name} />
            </div>
        </div>
      ))}
    </div>
  );
};

