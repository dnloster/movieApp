import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./movieCard.scss";

import { Link } from "react-router-dom";
import Button from "../button/Button";
import { category } from "../../api/tmdbAPI";
import apiConfig from "../../api/apiConfig";

const MovieCard = (props) => {
    const item = props.item;
    const link = "/" + category[props.category] + "/" + item.id;
    const bg = apiConfig.w500Image(item.poster_path);
    // console.log(item);

    return (
        <Link to={link}>
            <div
                className="movie-card"
                style={{ backgroundImage: `url(${bg})` }}
            >
                <Button>
                    <i className="fa-solid fa-play"></i>
                </Button>
            </div>
            <h3 className="title-card">{item.title || item.name}</h3>
        </Link>
    );
};

export default MovieCard;
