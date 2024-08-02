import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import tmdbAPI from "../../api/tmdbAPI";
import apiConfig from "../../api/apiConfig";
import "./detail.scss";

import CastList from "./CastList";
import MovieList from "../../components/movieList/MovieList";
import { OutlineButton } from "../../components/button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Detail = () => {
    const { category, id } = useParams();

    const [item, setItem] = useState(null);

    // console.log(item);

    const notify = () => {
        toast.info("Chức năng đang phát triển!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbAPI.detail(category, id, { params: {} });
            // console.log(response);
            setItem(response);
            window.scrollTo(0, 0);
        };
        getDetail();
    }, [category, id]);

    return (
        <>
            {item && (
                <>
                    <div
                        className="banner"
                        style={{
                            backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`,
                        }}
                    ></div>
                    <div className="mb-3 movie-content container">
                        <div className="movie-content__poster">
                            <div
                                className="movie-content__poster__img"
                                style={{
                                    backgroundImage: `url(${apiConfig.originalImage(
                                        item.poster_path || item.backdrop_path
                                    )})`,
                                }}
                            ></div>
                        </div>
                        <div className="movie-content__info">
                            <h1 className="title">{item.title || item.name}</h1>
                            <p className="overview">{item.overview}</p>
                            <p className="release">Ngày phát hành: {item.release_date}</p>
                            <div className="genres">
                                {item.genres &&
                                    item.genres.slice(0, 5).map((genre, i) => (
                                        <span key={i} className="genres__item">
                                            {genre.name}
                                        </span>
                                    ))}
                            </div>
                            <p className="vote">
                                Đánh giá trung bình: {item.vote_average} ({item.vote_count} lượt)
                            </p>
                            <div className="button__controls">
                                <OutlineButton onClick={notify}>Thêm vào yêu thích</OutlineButton>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="section mb-3">
                            <div className="video">
                                <iframe
                                    src={
                                        item.episode_run_time
                                            ? `https://www.2embed.cc/embed/${item.id}&s=${
                                                  item.seasons[0].season_number
                                              }&e=${1}`
                                            : `https://www.2embed.cc/embed/${item.id}`
                                    }
                                    width="100%"
                                    height="100%"
                                    title="Video"
                                    allow="fullscreen"
                                ></iframe>
                            </div>
                        </div>
                        <div className="section mb-3">
                            <div className="cast">
                                <div className="section__header">
                                    <h2>Diễn viên</h2>
                                </div>
                                <CastList id={item.id} />
                            </div>
                        </div>
                        <div className="section mb-3">
                            <div className="section__header mb-2">
                                <h2>Phim tương tự</h2>
                            </div>
                            <MovieList category={category} type="similar" id={item.id} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Detail;
