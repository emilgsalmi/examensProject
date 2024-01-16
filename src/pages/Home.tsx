import { Product } from "../components/Product"
import "../styles/Home/home.style.scss"
import mainBackground from "../assets/pexels-rene-asmussen-1539788.jpg"
import guitarBackground from "../assets/pexels-stephen-niemeier-63695.jpg"
import pedalBackground from "../assets/pexels-stephen-niemeier-68710.jpg"

export const Home = () => {

    return(
        <>
            <div className="full-page">
                <section className="main-page" style={{background:`url(${mainBackground})`, backgroundSize:"cover"}}>
                    {/* <img className="mainBackground" src={`${mainBackground}`} alt="" /> */}
                    <div className="main-content">
                        <img src="" alt="" />
                        <h1>emils gitarr butik</h1>
                    </div>
                </section>
                <section className="guitar-page" style={{background:`url(${guitarBackground})`, backgroundSize:"cover"}}>
                    <Product productName="Gibson ES335"/>
                </section>
                <section  className="pedal-page" style={{background:`url(${pedalBackground})`, backgroundSize:"cover"}}>
                </section>
            </div>
        </>
    )
}

 