import React, {useState} from 'react';
import headerStyles from '../assets/styles/header.module.sass'
import logo from '../assets/images/simpleTrelloLogo.svg'
import {Link} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";


const Header = ({showAuthModal}) => {
    const auth = useAuth()
    const [logOutIcon, setLogOutIcon] = useState('#8FBC8F')

    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.header__container}>
                <Link to='/'><img src={logo} alt="logo"/></Link>
                {auth.isAuth
                    ? <div className={headerStyles.auth__buttons}>
                        <svg
                            onMouseOver={() => setLogOutIcon('#345e37')}
                            onMouseOut={() => setLogOutIcon('#8FBC8F')}
                            width="29" height="26" viewBox="0 0 29 26" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.2776 7.22219V4.44444C17.2776 3.70773 16.985 3.0012 16.464 2.48027C15.9431 1.95934 15.2366 1.66669 14.4999 1.66669H4.77775C4.04104 1.66669 3.33451 1.95934 2.81358 2.48027C2.29265 3.0012 2 3.70773 2 4.44444V21.1109C2 21.8477 2.29265 22.5542 2.81358 23.0751C3.33451 23.596 4.04104 23.8887 4.77775 23.8887H14.4999C15.2366 23.8887 15.9431 23.596 16.464 23.0751C16.985 22.5542 17.2776 21.8477 17.2776 21.1109V18.3332M10.3336 12.7776H27.0001M27.0001 12.7776L22.8335 8.61096M27.0001 12.7776L22.8335 16.9442"
                                stroke={logOutIcon} strokeWidth="2.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    : <div className={headerStyles.auth__buttons}>
                        <button className={headerStyles.auth__buttonLink} onClick={()=>showAuthModal('signIn')}>Sing in</button>
                        <button className={headerStyles.auth__button} onClick={()=>showAuthModal('signUp')}>Sign up</button>
                    </div>
                }
            </div>
        </header>
    );
};

export default Header;
