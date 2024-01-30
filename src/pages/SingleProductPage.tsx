import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGuitars, getPedals, Product } from '../services/firebase';
import "../styles/SingleProduct/product.style.scss";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartItem, useCart } from '../contexts/CartContext';

export const SingleProductPage: React.FC = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const guitars = await getGuitars();
        const pedals = await getPedals();

        // Combine the lists of guitars and pedals
        const allProducts = [...guitars, ...pedals];

        // Find the selected product by name
        const selectedProduct = allProducts.find((product) => product.name === productName);
        setProduct(selectedProduct || null);
      } catch (error) {
        console.error('Error fetching product', error);
      }
    };

    fetchProduct();
  }, [productName]);

  const toggleAccordion = () => {
    setOpenAccordion(!openAccordion);
  };

// SingleProductPage.tsx
const handleAddToCart = () => {
    if (product) {
        const itemsToAdd: CartItem[] = [{product, quantity: 1,}]
      addToCart(itemsToAdd);
    }
  };
  
  

  return (
    <div>
      {product ? (
        <div className='single-product-container'>
          <div className='icon-wrapper'>
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(`/products`)} />
          </div>
          <div className='single-product-wrapper'>
            <div className='single-product-info'>
              <div className='info-wrapper'>
                <h2>{product.name}</h2>
                <p>Pris: {product.price}kr</p>
                <p>Beskrivning: <br /> {product.description}</p>
                {product.specifications && ( // Only render if specifications exist
                  <div className='spec-accordion' onClick={toggleAccordion}>
                    <p>Specifikationer:</p>
                    {openAccordion && (
                      <div className='accordion-content'>
                        {product.specifications.body && <p>Body: {product.specifications.body}</p>}
                        {product.specifications.fretboard && <p>Fretboard: {product.specifications.fretboard}</p>}
                        {product.specifications.neck && <p>Neck: {product.specifications.neck}</p>}
                        {product.specifications.pickups && <p>Pickups: {product.specifications.pickups}</p>}
                      </div>
                    )}
                  </div>
                )}
                <audio controls>
                  <source src={product.audioUrls} type='audio/mp4' />
                </audio>
              </div>
              <button className="button" onClick={handleAddToCart}>Lägg till i varukorgen</button>
            </div>
            <img className='single-product-image' src={product.imageUrl} alt={product.name} />
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};
