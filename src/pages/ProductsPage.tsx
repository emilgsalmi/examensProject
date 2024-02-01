// Importing React, hooks, services, and styles
import React, { useEffect, useState } from 'react'
import { getGuitars, getPedals, Product } from '../services/firebase'
import "../styles/ProductPage/productpage.style.scss"
import { useNavigate } from 'react-router-dom'

// ProductsPage component
export const ProductsPage: React.FC = () => {
  // State to store the list of products
  const [products, setProducts] = useState<Product[]>([])
  // Hook to navigate to different routes
  const navigate = useNavigate()

  // useEffect to fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetching lists of guitars and pedals using the firebase functions
        const guitars = await getGuitars()
        const pedals = await getPedals()

        // Combine the lists of guitars and pedals
        const allProducts = [...guitars, ...pedals]

        // Setting the combined product list to the state
        setProducts(allProducts)
      } catch (error) {
        console.error('Error fetching products', error)
      }
    }

    // Calling the fetchProducts function when the component mounts
    fetchProducts()
  }, [])

  // Filtering out products that are marked as sold
  const visibleProducts = products.filter(product => !product.isSold)

  // Render the ProductsPage component
  return (
    <div className='products-list-container'>
        {/* Title for the product list */}
        <h2 className='product-list-title' style={{textDecoration:"underline"}}>
            alla produkter
        </h2>
        {/* Wrapper for the product list */}
        <div className='wrapper' style={{width:"100%"}}>
        {/* Mapping over the visible products to render product information */}
        {visibleProducts.map((product) => (
          <div className='products-list-wrapper' onClick={() => navigate(`/products/${product.name}`)}>
            <div className='products-list'>
                <div className='productInfo'>
                    {/* Displaying product name and price */}
                    <h1 style={{fontSize:"20px"}}>{product.name}</h1>
                    <p> Pris: {product.price}kr</p>
                </div>
                {/* Displaying product image */}
                <img src={product.imageUrl} alt={product.name} />
            </div>
        </div>
      ))} 
      </div>
    </div>
  )
}

