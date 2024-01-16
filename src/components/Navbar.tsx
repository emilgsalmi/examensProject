/* import '../styles/Header/header.style.scss' */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "../styles/components/navbar/navbar.style.scss"

export const Navbar = () => {

    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else{
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    return(
        <div className='primary-nav-container'>
            <nav>
                <div className='burger-menu' onClick={updateMenu}>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                </div>
            </nav>

            <div className={menu_class}>
                <div className='menu-container'>
                    <div className='wrapper'>
                        <div className='links'>
                            <Link to="/products">Produkter</Link>
                            <Link to="/about">Om Oss</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

