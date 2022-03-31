import React from "react";
import { Link } from "react-router-dom";
import { OutlineButton } from "../components/button/Button";
import { HeroSlide } from "../components/hero-slide/Hero-slide";

import MovieList from "../components/movieList/MovieList";
import { category, movieType, tvType } from "../api/tmdbAPI";

const Home = () => {
    return (
        <>
            <HeroSlide />
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Phim nổi bật</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">
                                Xem thêm
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList
                        category={category.movie}
                        type={movieType.popular}
                    />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top rated</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">
                                Xem thêm
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList
                        category={category.movie}
                        type={movieType.top_rated}
                    />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>TV show nổi bật</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">
                                Xem thêm
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated TV</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">
                                Xem thêm
                            </OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated} />
                </div>
            </div>
        </>
    );
};

export default Home;
