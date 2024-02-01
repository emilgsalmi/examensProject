// Importing React hooks and services
import { useEffect, useState } from "react"
import { getGuitars, getPedals, Product } from "../services/firebase"
import "../styles/components/product/singleProduct.style.scss"
import { useNavigate } from "react-router-dom"

// Defining the props interface for SingleProduct component
export interface SingleProductProps {
  productName?: string;
}

// SingleProduct component definition
export const SingleProduct: React.FC<SingleProductProps> = ({ productName }) => {
  // State hooks to manage component state
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const navigate = useNavigate()

  // useEffect to fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetching guitars and pedals from firebase.ts
        const guitars = await getGuitars()
        const pedals = await getPedals()
        // Combining both arrays into a single array
        const allProducts = [...guitars, ...pedals]
        
        // Setting the products state
        setProducts(allProducts)
      } catch (error) {
        console.error('Error fetching products', error)
        setError('Error fetching products')
      } finally {
        // Marking loading as false after fetching is complete
        setLoading(false)
      }
    };

    // Calling the fetchProducts function
    fetchProducts()
  }, [])

  // useEffect to update the selectedProduct based on the productName prop
  useEffect(() => {
    // Finding the product with the matching name
    const productToDisplay = products.find((product) => product.name === productName)
    // Setting the selectedProduct state
    setSelectedProduct(productToDisplay || null)
  }, [products, productName])

  // Render the component based on the state
  return (
    <div className="product-container">
      {/* Loading message */}
      {loading && <p>Loading...</p>}
      {/* Error message */}
      {error && <p>{error}</p>}
      {/* Message when no product is selected */}
      {!loading && !error && !selectedProduct && <p>No product selected</p>}
      {/* Rendering product information when available */}
      {!loading && !error && selectedProduct && (
        <>
          {/* Product information */}
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
  )
}
