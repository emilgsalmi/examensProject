import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProducts } from '../services/firebase';
import { DocumentData } from 'firebase/firestore';
import "../styles/SingleProduct/product.style.scss"

export const SingleProductPage: React.FC = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState<DocumentData | null>(null);
  const [openAccordion, setOpenAccordion ] = useState<boolean>(false)
  const navigate = useNavigate()


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productList = await getProducts();
        const selectedProduct = productList.find((product) => product.name === productName);
        setProduct(selectedProduct || null);
      } catch (error) {
        console.error('Error fetching product', error);
      }
    };

    fetchProduct();
  }, [productName]);

  const toogleAccordion = () => {
    setOpenAccordion(!openAccordion)
  }

  return (
    <div>
      {product ? (
        <div className='single-product-container'>
            <button className='button' onClick={() => navigate(`/products`)}>
                Tillbaka
            </button>
            <div className='single-product-wrapper'>
                <div className='single-product-info'>
                    <div className='info-wrapper'>
                        <h2>{product.name}</h2>
                        <p>Pris: {product.price}kr</p>
                        <p>Beskrivning: <br /> {product.description}</p>
                        <div className='spec-accordion' onClick={toogleAccordion}>
                            <p>Specifikationer:</p>
                            {openAccordion && (
                                <div className='accordion-content'>
                                <p>Body: {product.specifications.body}</p>
                                <p>Fretboard: {product.specifications.fretboard}</p>
                                <p>Neck: {product.specifications.neck}</p>
                                <p>Pickups: {product.specifications.pickups}</p>
                                </div>
                        )}
                        </div>
                        <audio controls>
                            <source src={product.audioUrls} type='audio/mp4'/>
                        </audio>
                    </div>
                    <button className="button">Lägg till i varukorgen</button>
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


