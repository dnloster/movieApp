import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "./header.scss";

import logo from "../../assets/AppIcon.png";

const headerNav = [
    {
        display: "Home",
        path: "/",
    },
    {
        display: "Movies",
        path: "/movie",
    },
    {
        display: "TV Series",
        path: "/tv",
    },
];

window.fbAsyncInit = function () {
    window.FB.init({
        appId: "1343361016141349",
        cookie: true,
        xfbml: true,
        version: "v13.0",
    });
    window.FB.AppEvents.logPageView();
    window.FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

(function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

function statusChangeCallback(response) {
    // user đã đăng nhập facebook và đã đăng nhập vào ứng dụng
    if (response.status === "connected") {
        showLogined();
    }
    // user đã đăng nhập facebook nhưng chưa đăng nhập ứng dụng
    else if (response.status === "not_authorize") {
        showLoginButton();
    }
    // user chưa đăng nhập facebook
    else {
        showLoginButton();
    }
}

function RequestLoginFB() {
    window.location =
        "http://graph.facebook.com/oauth/authorize?client_id=1343361016141349&scope=public_profile,email,user_likes&redirect_uri=https://moviereactap.herokuapp.com";
}

function showLoginButton() {
    document.getElementById("btn_login").setAttribute("style", "display:block");
    document.getElementById("lbl").setAttribute("style", "display:none");
}

function showLogined() {
    document.getElementById("btn_login").setAttribute("style", "display:none");
    window.FB.api("/me", function (response) {
        var name = response.name;
        var username = response.username;
        document.getElementById("lbl").innerHTML =
            "Tên=" + name + " | username=" + username;
        document.getElementById("lbl").setAttribute("style", "display:block");
    });
}

const Header = () => {
    const { pathname } = useLocation();
    const headerRef = useRef(null);
    const active = headerNav.findIndex((e) => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (
                document.body.scrollTop > 100 ||
                document.documentElement.scrollTop > 100
            ) {
                headerRef.current.classList.add("shrink");
            } else {
                headerRef.current.classList.remove("shrink");
            }
        };
        window.addEventListener("scroll", shrinkHeader);
        return () => {
            window.removeEventListener("scroll", shrinkHeader);
        };
    }, []);

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <Link to="/">
                        <h2>PhimCu</h2>
                    </Link>
                </div>
                <div className="login_wrap">
                    <input
                        type="button"
                        id="btn_login"
                        value="Đăng nhập"
                        onClick={RequestLoginFB()}
                        style={{ display: "none", cursor: "pointer" }}
                    />
                    <p id="lbl" style={{ display: "none" }}>
                        BẠN ĐÃ ĐĂNG NHẬP THÀNH CÔNG!
                    </p>
                </div>
                <ul className="header__nav">
                    {headerNav.map((item, index) => (
                        <li
                            key={index}
                            className={`${index === active ? "active" : ""}`}
                        >
                            <Link to={item.path}>{item.display}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Header;
