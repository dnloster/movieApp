import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./movieGrid.scss";

import MovieCard from "../MovieCard/MovieCard";
import Button, { OutlineButton } from "../button/Button";
import Input from "../Input/Input";

import tmdbAPI, { category, movieType, tvType } from "../../api/tmdbAPI";

export default function MovieGrid(props) {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                switch (props.category) {
                    case category.movie:
                        response = await tmdbAPI.getMoviesList(
                            movieType.upcoming,
                            { params }
                        );
                        break;
                    default:
                        response = await tmdbAPI.getTvList(tvType.popular, {
                            params,
                        });
                }
            } else {
                const params = {
                    query: keyword,
                };
                response = await tmdbAPI.search(props.category, { params });
            }
            setItems(response.results);
            setTotalPage(response.total_pages);
        };
        getList();
    }, [props.category, keyword]);

    const LoadMore = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1,
            };
            switch (props.category) {
                case category.movie:
                    response = await tmdbAPI.getMoviesList(movieType.upcoming, {
                        params,
                    });
                    break;
                default:
                    response = await tmdbAPI.getTvList(tvType.popular, {
                        params,
                    });
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword,
            };
            response = await tmdbAPI.search(props.category, { params });
        }
        setItems([...items, ...response.results]);
        setTotalPage(page + 1);
    };

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword} />
            </div>
            <div className="movie-grid">
                {items.map((item, index) => (
                    <MovieCard
                        category={props.category}
                        item={item}
                        key={index}
                    />
                ))}
            </div>
            {page < totalPage ? (
                <div className="movie-grid__loadmore">
                    <OutlineButton className="small" onClick={() => LoadMore()}>
                        Load more
                    </OutlineButton>
                </div>
            ) : null}
        </>
    );
}

const MovieSearch = (props) => {
    const history = useHistory();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            history.push(`/${category[props.category]}/search/${keyword}`);
        }
    }, [keyword, props.category, history]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keycode === 13) {
                goToSearch();
            }
        };
        document.addEventListener("keyup", enterEvent);
        return () => {
            document.removeEventListener("keyup", enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Nhập từ khoá"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>
                Tìm kiếm
            </Button>
        </div>
    );
};
