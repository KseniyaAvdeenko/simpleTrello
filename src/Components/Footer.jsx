import React from 'react';
import footerStyles from '../assets/styles/footer.module.sass'
import {Link} from "react-router-dom";
import Logo from '../assets/images/simpleTrelloLogo.svg'

const Footer = () => {
    return (
        <footer className={footerStyles.footer}>
            <Link to="/" className={footerStyles.footer__link}><img src={Logo} alt="logo"/></Link>
            <p className={footerStyles.footer__text}>Made by AKA</p>
        </footer>
    );
};

export default Footer;
