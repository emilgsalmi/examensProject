// SingleProductPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../services/firebase';
import { SingleProduct } from '../components/singleProduct';
import { DocumentData } from 'firebase/firestore';

export const SingleProductPage: React.FC = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState<DocumentData | null>(null);
  const navigate = useNavigate();

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

  return (
    <div>
      <h2>Product Page</h2>
      {product ? (
        <SingleProduct productName={product.name} />
      ) : (
        <p>Product not found</p>
      )}
      <button className="to-product" onClick={() => navigate(`/products/${productName}`)}>
        Till Produkten
      </button>
    </div>
  );
};



/* // ProductPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../services/firebase';
import { SingleProduct } from '../components/singleProduct';
import { ProductProps } from '../components/singleProduct';

export const SingleProductPage: React.FC = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const navigate = useNavigate();

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

  return (
    <div>
      <h2>Product Page</h2>
      {product ? (
        <SingleProduct productName={product.name} />
      ) : (
        <p>Product not found</p>
      )}
      <button className="to-product" onClick={() => navigate(`/product/${productName}`)}>
        Till Produkten
      </button>
    </div>
  );
}; */

