import './App.css'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'

function App() {
  
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Home />
      </main>
    </>
  )
}

export default App
