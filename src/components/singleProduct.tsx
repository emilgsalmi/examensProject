import { useEffect, useState } from "react";
import { getGuitars, getPedals, Product } from "../services/firebase";
import "../styles/components/product/singleProduct.style.scss";
import { useNavigate } from "react-router-dom";

export interface SingleProductProps {
  productName?: string;
}

export const SingleProduct: React.FC<SingleProductProps> = ({ productName }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

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
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Fetch products when the component mounts

  useEffect(() => {
    // Update selectedProduct when productName changes
    const productToDisplay = products.find((product) => product.name === productName);
    setSelectedProduct(productToDisplay || null);
  }, [products, productName]);

  return (
    <div className="product-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && !selectedProduct && <p>No product selected</p>}
      {!loading && !error && selectedProduct && (
        <>
          <div className="product-wrapper">
            <div className="product-info">
              <h3>{selectedProduct.name}</h3>
              <p>Beskrivning: <br />{selectedProduct.description}</p>
            </div>
            <button onClick={() => navigate(`/products/${selectedProduct.name}`)} className="button">Till produkt</button>
          </div>
          <img className="product-image" src={selectedProduct.imageUrl} alt={selectedProduct.name} />
        </>
      )}
    </div>
  );
};
