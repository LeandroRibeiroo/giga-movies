const apiConfig = {
  baseURL: 'https://api.themoviedb.org/3/',
  apiKey: 'b03e6dd9ba089e3a7e9644d3700e0763',
  originalImage: (imgPath: string) =>
    `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
