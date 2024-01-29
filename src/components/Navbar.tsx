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
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [menuRef]);
    

    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked");
            setMenuClass("menu visible");
        } else {
            closeMenu()
        }
        setIsMenuClicked(!isMenuClicked);
    };

    const closeMenu = () => {
        setBurgerClass("burger-bar unclicked")
        setMenuClass("menu hidden")
        setIsMenuClicked(false)
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

            <div className={menu_class} ref={menuRef}>
                <div className='menu-container'>
                    <div className='wrapper1'>
                        <div className='links'>
                            <Link onClick={closeMenu} to="/">Hem</Link>
                            <Link onClick={closeMenu} to="/products">Produkter</Link>
                            <Link onClick={closeMenu} to="/about">Om Oss</Link>
                            <Link onClick={closeMenu} to="/cart">Varukorg</Link>
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
