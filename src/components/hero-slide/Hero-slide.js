import React, { useState, useEffect, useRef } from "react";

import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Button, { OutlineButton } from "../button/Button";
import Modal, { ModalContent } from "../Modal/Modal";

import tmdbAPI, { category, movieType } from "../../api/tmdbAPI";
import apiConfig from "../../api/apiConfig";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./hero-slide.scss";

import { useHistory } from "react-router";

export const HeroSlide = () => {
    const [movieItem, setMovieItem] = useState([]);
    useEffect(() => {
        SwiperCore.use([Pagination]);

        const getMovies = async () => {
            const params = { page: 1 };
            try {
                const response = await tmdbAPI.getMoviesList(
                    movieType.popular,
                    { params }
                );
                setMovieItem(response.results.slice(0, 5));
                // console.log(response);
            } catch {
                console.log("error");
            }
        };
        getMovies();
    }, []);
    return (
        <div className="hero-slide">
            <Swiper
                pagination={true}
                modules={[Pagination]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            >
                {movieItem.map((item, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <HeroSlideItem
                                item={item}
                                className={`${isActive ? "active" : ""}`}
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {movieItem.map((item, index) => (
                <TrailerModal key={index} item={item} />
            ))}
        </div>
    );
};

const HeroSlideItem = (props) => {
    let history = useHistory();

    const item = props.item;

    const background = apiConfig.originalImage(
        item.backdrop_path ? item.backdrop_path : item.poster_path
    );

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        const videos = await tmdbAPI.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            const videoSrc = `https://www.youtube.com/embed/${videos.results[0].key}`;
            modal
                .querySelector(".modal__content > iframe")
                .setAttribute("src", videoSrc);
        } else {
            modal.querySelector(
                ".modal__content"
            ).innerHTML = `<h2>No trailer available</h2>`;
        }
        window.addEventListener("click", () => {
            modal.classList.remove("active");
        });
        modal.classList.toggle("active");
    };
    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button
                            onClick={() => history.push("/movie/" + item.id)}
                        >
                            Xem ngay
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Xem trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    );
};

const TrailerModal = (props) => {
    const item = props.item;
    const iframeRef = useRef(null);
    const onClose = () => iframeRef.current.setAttribute("src", "");

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe
                    ref={iframeRef}
                    width="100%"
                    height="500px"
                    title="trailer"
                ></iframe>
            </ModalContent>
        </Modal>
    );
};
