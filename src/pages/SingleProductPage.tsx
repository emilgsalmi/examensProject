import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../services/firebase';
import { DocumentData } from 'firebase/firestore';
import "../styles/SingleProduct/product.style.scss"

export const SingleProductPage: React.FC = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState<DocumentData | null>(null);
  const [openAccordion, setOpenAccordion ] = useState<boolean>(false)


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
            <div className='single-product-wrapper'>
                <div className='single-product-info'>
                    <div className='info-wrapper'>
                        <h2>{product.name}</h2>
                        <p>Pris: {product.price}</p>
                        <p>Beskrivning: {product.description}</p>
                        <div className='spec-accordion' onClick={toogleAccordion}>
                            Mer info:
                            {openAccordion && (
                                <div className='accordion-content'>
                                <p>Specifikationer:</p>
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
                    <button className="button">KÖP</button>
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


