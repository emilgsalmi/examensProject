import React, { useEffect, useState } from 'react';
import { getGuitars, getPedals, Product } from '../services/firebase';
import "../styles/ProductPage/productpage.style.scss"
import { useNavigate } from 'react-router-dom';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const guitars = await getGuitars();
        const pedals = await getPedals();

        // Combine the lists of guitars and pedals
        const allProducts = [...guitars, ...pedals];

        setProducts(allProducts); 
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  const visibleProducts = products.filter(product => !product.isSold);


  return (
    <div className='products-list-container'>
        <h2 className='product-list-title' style={{textDecoration:"underline"}}>
            alla produkter
        </h2>
        <div className='wrapper' style={{width:"100%"}}>
        {visibleProducts.map((product) => (
          <div className='products-list-wrapper' onClick={() => navigate(`/products/${product.name}`)}>
            <div className='products-list'>
                <div className='productInfo'>
                    <h1 style={{fontSize:"20px"}}>{product.name}</h1>
                    <p> Pris: {product.price}kr</p>
                </div>
                <img src={product.imageUrl} alt={product.name} />
            </div>
        </div>
      ))} 
      </div>
    </div>
  );
};

