import React, { useEffect, useState } from 'react';
import { getProducts, Product } from '../services/firebase';
import "../styles/ProductPage/productpage.style.scss"

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

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
          <div style={{width:"80%"}}>
            <div className='products-list-wrapper'>
                <div className='productInfo'>
                    <h1>{product.name}</h1>
                    <p> Pris: {product.price}kr</p>
                    <p>Beskrivning: <br/>{product.description}</p>
                    <div className='info-accordion'>
                        Mer info
                        <div className="accordion-content">
                            <p>Body: {product.specifications.body}</p>
                            <p>Fretboard: {product.specifications.fretboard}</p>
                            <p>Neck: {product.specifications.neck}</p>
                            <p>Pickups: {product.specifications.pickups}</p>
                        </div>
                    </div>

                </div>
                <img src={product.imageUrl} alt={product.name} />
            </div>
        </div>
      ))}
    </div>
  );
};

