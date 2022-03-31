import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./movieList.scss";

import { Navigation } from "swiper";

import { SwiperSlide, Swiper } from "swiper/react";

import tmdbAPI, { category } from "../../api/tmdbAPI";

import MovieCard from "../MovieCard/MovieCard";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieList = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== "similar") {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbAPI.getMoviesList(props.type, {
                            params,
                        });
                        break;
                    default:
                        response = await tmdbAPI.getTvList(props.type, {
                            params,
                        });
                }
            } else {
                response = await tmdbAPI.similar(props.category, props.id);
            }
            setItems(response.results);
        };
        getList();
    }, [props.category, props.id, props.type]);

    return (
        <div className="movie-list">
            <Swiper
                navigation={true}
                modules={[Navigation]}
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={"auto"}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <MovieCard item={item} category={props.category} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default MovieList;
