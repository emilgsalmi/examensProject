import { DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"
import { getProducts } from "../services/firebase"

interface ProductProps{
  productName?:string
}

export const Product: React.FC<ProductProps> = ({ productName }) => {
  const [products, setProducts] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<DocumentData | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts()
        setProducts(productList)
      } catch (error) {
        console.error('Error fetching products', error)
        setError('Error fetching products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts();
  }, []) // Fetch products when the component mounts

  useEffect(() => {
    // Update selectedProduct when productId changes
    const productToDisplay = products.find((product) => product.name === productName)
    setSelectedProduct(productToDisplay || null);
  }, [products, productName]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && !selectedProduct && <p>No product selected</p>}
      {!loading && !error && selectedProduct && (
        <>
          <div>
            <h3>{selectedProduct.name}</h3>
            <p>Beskrivning: <br />{selectedProduct.description}</p>
          </div>
          <img style={{ height: 500 }} src={selectedProduct.imageUrl} alt={selectedProduct.name} />
        </>
      )}
    </div>
  )
}

