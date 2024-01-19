/* import '../styles/Header/header.style.scss' */
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../styles/components/navbar/navbar.style.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'

export const Navbar = () => {

    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setBurgerClass("burger-bar unclicked");
            setMenuClass("menu hidden");
            setIsMenuClicked(false);
          }
        };
        document.addEventListener('click', handleOutsideClick);
    
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      }, [menuRef]);

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
                    <div className='wrapper1'>
                        <div className='links'>
                            <Link to="/">Hem</Link>
                            <Link to="/products">Produkter</Link>
                            <Link to="/about">Om Oss</Link>
                        </div>
                    </div>
                    <div className='wrapper2'>
                        <div className='social'>
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faXTwitter} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

