// Importing components and libraries
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { ProductsPage } from './pages/ProductsPage'
import { About } from './pages/About'
import { SingleProductPage } from './pages/SingleProductPage'
import { CartPage } from './pages/CartPage'
import { CartProvider } from './contexts/CartContext'
import { ConfirmationPage } from './components/Conformation'

// The main App component
export default function App() {
  
  // The component returns
  return (
    <>
      {/* Header section with Navbar component */}
      <header>
        <Navbar />
      </header>
      {/* Main section */}
      <main>
        {/* CartProvider wraps the Routes to provide cart-related functionality */}
        <CartProvider>
           {/* Routes component to define different routes */}
          <Routes>
             {/* Route for the home page */}
            <Route path='/' element={<Home />}/>
            {/* Route for the products page */}
            <Route path='/products' element={<ProductsPage />}/>
            {/* Route for a single product page, dynamic parameter ':productName' */}
            <Route path='products/:productName' element={<SingleProductPage />} />
            {/* Route for the about page */}
            <Route path='/about' element={<About />}/>
            {/* Route for the cart page */}
            <Route path='/cart' element={<CartPage />} />
            {/* Route for the confirmation page */}
            <Route path='/conformation' element={<ConfirmationPage />}/>
          </Routes>
        </CartProvider>
      </main>
    </>
  )
}


