// Importing React and components and services
import React, { useEffect, useState } from 'react'
import { getGuitars, getPedals } from '../services/firebase'
import { SingleProduct } from '../components/singleProduct'
import { DocumentData } from 'firebase/firestore'

// SingleProductPage component
export const ShowProduct: React.FC = () => {

  // State to store the product data
  const [product, setProduct] = useState<DocumentData | null>(null)

  // useEffect to fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetching lists of guitars and pedals using the services/firebase functions
        const guitars = await getGuitars()
        const pedals = await getPedals()

        // Combine the lists of guitars and pedals
        const allProducts = [...guitars, ...pedals]

        // Setting the combined product list to the state
        setProduct(allProducts)
      } catch (error) {
        console.error('Error fetching products', error)
      }
    }

    // Calling the fetchProducts function when the component mounts
    fetchProducts()
  }, [])

  // Render the SingleProductPage component
  return (
    <div>
      <h2>Product Page</h2>
      {/* Conditional rendering based on whether the product data is available */}
      {product ? (
        // Rendering the SingleProduct component with the productName prop
        <SingleProduct productName={product.name} />
      ) : (
        // Displaying a message if the product is not found
        <p>Product not found</p>
      )}
    </div>
  )
}
