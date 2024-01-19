import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { ProductsPage } from './pages/ProductPage'
import { About } from './pages/About'

function App() {
  
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products' element={<ProductsPage />}/>
          <Route path='/about' element={<About />}/>
        </Routes>
      </main>
    </>
  )
}

export default App
