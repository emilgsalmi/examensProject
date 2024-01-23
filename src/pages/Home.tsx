import { useState } from "react"
import { ProductProps } from "../components/singleProduct"
import "../styles/Home/home.style.scss"
import mainBackground from "../assets/pexels-rene-asmussen-1539788.jpg"
import guitarBackground from "../assets/pexels-stephen-niemeier-63695.jpg"
import pedalBackground from "../assets/pexels-stephen-niemeier-68710.jpg"
import Slideshow from "../components/Slideshow/Slideshow"

export const Home: React.FC = () => {

    const [products, setProducts] = useState<ProductProps[]>([
        { productName: 'Gibson ES335', /* other properties */ },
        { productName: 'Gibson Les Paul', /* other properties */ },
      ]);    

  return (
    <>
      <div className="full-page">
        <section className="main-page" style={{ background: `url(${mainBackground})`, backgroundSize: "cover" }}>
          <div className="main-content">
            <h1>emils gitarr butik</h1>
          </div>
        </section>
        <section className="guitar-page" style={{ background: `url(${guitarBackground})`, backgroundSize: "cover" }}>
            <div className="guitar-page-container">
                <h1>Senaste nytt</h1>
                <Slideshow products={products}/>
            </div>
        </section>
        <section className="pedal-page" style={{ background: `url(${pedalBackground})`, backgroundSize: "cover" }}>
        </section>
      </div>
    </>
  )
}

