export default () => ({
  tmdb: {
    baseUrl: 'https://api.themoviedb.org/',
    apiKey: process.env.TMDB_API_KEY,
  },
  options: {
    cacheTTL: process.env.CACHE_TTL || 3600,
    port: parseInt(process.env.PORT, 10) || 3000,
  },
});
