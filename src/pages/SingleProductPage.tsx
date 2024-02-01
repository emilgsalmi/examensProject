// Importing React, hooks, components, and styles
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getGuitars, getPedals, Product } from '../services/firebase'
import "../styles/SingleProduct/product.style.scss"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CartItem, useCart } from '../contexts/CartContext'

// SingleProductPage component
export const SingleProductPage: React.FC = () => {
  // Getting the 'productName' from the URL params
  const { productName } = useParams()
  // State to store the selected product data
  const [product, setProduct] = useState<Product | null>(null)
  // State to manage the accordion toggle
  const [openAccordion, setOpenAccordion] = useState<boolean>(false)
  // Hook to navigate to different routes
  const navigate = useNavigate()
  // Using the CartContext to access the 'addToCart' function
  const { addToCart } = useCart()

  // useEffect to fetch the selected product when the component mounts or 'productName' changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetching lists of guitars and pedals using the firebase functions
        const guitars = await getGuitars()
        const pedals = await getPedals()

        // Combine the lists of guitars and pedals
        const allProducts = [...guitars, ...pedals]

        // Find the selected product by name
        const selectedProduct = allProducts.find((product) => product.name === productName)
        setProduct(selectedProduct || null)
      } catch (error) {
        console.error('Error fetching product', error)
      }
    };

    // Calling the fetchProduct function when the component mounts or 'productName' changes
    fetchProduct()
  }, [productName])

    // Function to toggle the accordion state
    const toggleAccordion = () => {
        setOpenAccordion(!openAccordion)
    };

    // Function to handle adding the product to the cart
    const handleAddToCart = () => {
        if (product) {
            const itemsToAdd: CartItem[] = [{product, quantity: 1,}]
        addToCart(itemsToAdd)
        }
    }
  
  // Render the SingleProductPage component
  return (
    <div>
      {product ? (
        // Rendering the product details when the product data is available
        <div className='single-product-container'>
          <div className='icon-wrapper'>
            {/* Back arrow icon to navigate back to the products page */}
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(`/products`)} />
          </div>
          <div className='single-product-wrapper'>
            <div className='single-product-info'>
              <div className='info-wrapper'>
                {/* Displaying product information */}
                <h2>{product.name}</h2>
                <p>Pris: {product.price}kr</p>
                <p>Beskrivning: <br /> {product.description}</p>

                {product.specifications && ( 
                  // Render specifications accordion if specifications exist
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
                {/* Audio player for the product */}
                <audio controls>
                  <source src={product.audioUrls} type='audio/mp4' />
                </audio>
              </div>
              {/* Button to add the product to the cart */}
              <button className="button" onClick={handleAddToCart}>Lägg till i varukorgen</button>
            </div>
            {/* Displaying the product image */}
            <img className='single-product-image' src={product.imageUrl} alt={product.name} />
          </div>
        </div>
      ) : (
        // Displaying a message if the product is not found
        <p>Product not found</p>
      )}
    </div>
  )
}
