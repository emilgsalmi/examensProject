import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { ProductsPage } from './pages/ProductsPage'
import { About } from './pages/About'
import { SingleProductPage } from './pages/SingleProductPage'
import { CartPage } from './pages/CartPage'
import { CartProvider } from './contexts/CartContext'


function App() {
  
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <CartProvider>
          <Routes>          
            <Route path='/' element={<Home />}/>
            <Route path='/products' element={<ProductsPage />}/>
            <Route path='products/:productName' element={<SingleProductPage />}></Route>
            <Route path='/about' element={<About />}/>
            <Route path='/cart' element={<CartPage />} />
          </Routes>
        </CartProvider>
      </main>
    </>
  )
}

export default App
