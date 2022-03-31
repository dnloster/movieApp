import React from "react";
import "./footer.scss";

import { Link } from "react-router-dom";

import bg from "../../assets/footer-bg.jpg";
import logo from "../../assets/AppIcon.png";

const Footer = () => {
    return (
        <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <Link to="/">
                            <h2>PhimCu</h2>
                        </Link>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <Link to="/">Home</Link>
                        <Link to="/">Contact</Link>
                        <Link to="/">Term of service</Link>
                        <Link to="/">About us</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">Live</Link>
                        <Link to="/">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Privacy</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">You must watch</Link>
                        <Link to="/">Recent Release</Link>
                        <a
                            href="https://www.imdb.com/chart/top/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Top IMDB
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
