import { DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"
import { getProducts } from "../services/firebase"

interface ProductProps{
    selectedProduct?:string
}

export const ProductList: React.FC<ProductProps> = ({selectedProduct}) =>  {
    const [productLists, setProductLists] = useState<DocumentData[]>([])

    useEffect(() => {
        const fetchProductList = async() => {
            try{
                const productList = await getProducts()
                setProductLists(productList)
            } catch (error){
                console.log('Error fetching products', error);
            }
        }        
        fetchProductList()
    }, [])

    const filteredProducts = selectedProduct 
    ? productLists.filter((product) => product.name)
    : productLists

    return (
        <div>
            <h1>Product List</h1>
            {filteredProducts.map((product, index) => (
                <div key={index}>
                    <h3>{product.name}</h3>
                    <img style={{height:500, borderRadius:"25px"}} src={product.imageUrl} alt={product.name}/>
                </div>
            ))}
        </div>
    )
}