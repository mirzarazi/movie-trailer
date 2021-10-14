export default () => ({
  tmdb: {
    baseUrl: 'https://api.themoviedb.org/',
    apiKey: 'dd65212089608f543b43b8c7d71bf02e',
  },
  port: parseInt(process.env.PORT, 10) || 3000,
});
