// Importing React hooks, components, and styles
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../styles/components/navbar/navbar.style.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'

// Navbar component
export const Navbar = () => {

    // State to manage burger menu and navigation menu visibility
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    // Ref to the menu container to handle outside clicks
    const menuRef = useRef<HTMLDivElement>(null)
    
    // useEffect to handle outside clicks and close the menu
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeMenu()
            }
        };

        // Adding event listener for outside clicks
        document.addEventListener('mousedown', handleOutsideClick)

        // Cleanup: remove event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        };
    }, [menuRef]);
    
    // Function to update the menu state
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        } else {
            closeMenu()
        }
        setIsMenuClicked(!isMenuClicked)
    }
    
    // Function to close the menu
    const closeMenu = () => {
        setBurgerClass("burger-bar unclicked")
        setMenuClass("menu hidden")
        setIsMenuClicked(false)
    }

    // Render the navbar
    return(
        <div className='primary-nav-container'>
            <nav>
                {/* Burger menu icon */}
                <div className='burger-menu' onClick={updateMenu}>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                </div>
            </nav>

            {/* Navigation menu */}
            <div className={menu_class} ref={menuRef}>
                <div className='menu-container'>
                    <div className='wrapper1'>
                        <div className='links'>
                            {/* Navigation links with onClick to close the menu */}
                            <Link onClick={closeMenu} to="/">Hem</Link>
                            <Link onClick={closeMenu} to="/products">Produkter</Link>
                            <Link onClick={closeMenu} to="/about">Om Oss</Link>
                            <Link onClick={closeMenu} to="/cart">Varukorg</Link>
                        </div>
                    </div>
                    <div className='wrapper2'>
                        <div className='social'>
                            {/* Social media icons */}
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
