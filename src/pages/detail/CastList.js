import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import tmdbAPI from "../../api/tmdbAPI";
import apiConfig from "../../api/apiConfig";

export default function CastList(props) {
    const { category } = useParams();
    const [casts, setCasts] = useState([]);
    useEffect(() => {
        const getCredits = async () => {
            const response = await tmdbAPI.credits(category, props.id);
            setCasts(response.cast.slice(0, 10));
        };
        getCredits();
    }, [category, props.id]);

    return (
        <div className="casts">
            {casts.map((cast, index) => (
                <div className="casts__item" key={index}>
                    <div className="casts__item__img">
                        <img
                            src={
                                cast.profile_path !== null
                                    ? apiConfig.w500Image(cast.profile_path)
                                    : "https://images.unsplash.com/photo-1535704882196-765e5fc62a53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            }
                            alt=""
                        />
                    </div>
                    <div className="casts__item__name">
                        <div className="casts__item__realname">{cast.name}</div>
                        <div
                            className="casts__item__character"
                            style={{ color: "#f1c40f" }}
                        >
                            <span style={{ color: "rgb(169 167 167)" }}>
                                as{" "}
                            </span>
                            {cast.character}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
