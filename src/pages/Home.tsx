// Importing React hooks, components, and assets
import { useState } from "react"
import { SingleProductProps } from "../components/singleProduct"
import "../styles/Home/home.style.scss"
import mainBackground from "../assets/hassaan-here-oV9fhOHqjBI-unsplash.jpg"
import guitarBackground from "../assets/brigitte-elsner-aWkXoJCde4A-unsplash.jpg"
import pedalBackground from "../assets/athithan-vignakaran-qgj-Q1RV3bU-unsplash.jpg"
import Slideshow from "../components/Slideshow/Slideshow"

// Home component
export const Home: React.FC = () => {

    // State for the latest guitars and pedals
    const [guitars] = useState<SingleProductProps[]>([
        { productName: 'Gibson ES335', },
        { productName: 'Gibson Les Paul', },
      ]);    
    const [pedals] = useState<SingleProductProps[]>([
        { productName: 'Walrus Audio Julianna', },
        { productName: 'MXR reverb', },
      ]);    

      // Render the home page
  return (
    <>
    {/* Main container for the full page */}
      <div className="full-page">
        {/* Main section with background image */}
        <section className="main-page" style={{ background: `url(${mainBackground})`, backgroundSize: "cover" }}>
          <div className="main-content">
            <h1>emils gitarr butik</h1>
          </div>
        </section>
        {/* Guitar section with background image and slideshow */}
        <section className="guitar-page" style={{ background: `url(${guitarBackground})`, backgroundSize: "cover" }}>
            <div className="guitar-page-container">
                <h1>Senaste gitarrer</h1>
                {/* Slideshow component displaying latest guitars */}
                <Slideshow products={guitars}/>
            </div>
        </section>
        {/* Pedal section with background image and slideshow */}
        <section className="pedal-page" style={{ background: `url(${pedalBackground})`, backgroundSize: "cover" }}>
            <div className="pedals-page-container">
                <h1>Senaste pedaler</h1>
                {/* Slideshow component displaying latest pedals */}
                <Slideshow products={pedals}/>
            </div>
        </section>
      </div>
    </>
  )
}

