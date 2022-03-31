import "swiper/swiper.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.scss";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";

import Routes from "./config/Routes";

function App() {
    return (
        <BrowserRouter>
            <Route
                render={(props) => (
                    <>
                        <Header {...props} />
                        <Routes />
                        <Footer />
                    </>
                )}
            />
        </BrowserRouter>
    );
}

export default App;
