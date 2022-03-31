const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: "9909e9a0fef61de92707cee9d078bacb",
    language: "vi-VN",
    originalImage: (imgPath) =>
        `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
