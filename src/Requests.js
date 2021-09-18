const API_KEY = '59163cf6e49d3a416a0db67d03f726c8';
const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&&with_original_language=en`,
    fetchNetflix: `/discover/tv?api_key=${API_KEY}&with_networks=213&&with_original_language=en`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&&with_original_language=en`,
    fetchAction: `/discover/movie?api_key=${API_KEY}&with_genres=28&&with_original_language=en`,
    fetchComedy:`/discover/movie?api_key=${API_KEY}&with_genres=35&&with_original_language=en`,
    fetchHorror:`/discover/movie?api_key=${API_KEY}&with_genres=27&&with_original_language=en`,
    fetchRomance:`/discover/movie?api_key=${API_KEY}&with_genres=10749&&with_original_language=en`,
    fetchDocumentaries:`/discover/movie?api_key=${API_KEY}&with_genres=99&&with_original_language=en`,
    fetchGenres:`genre/movie/list?api_key=${API_KEY}&language=en-US`,
    fetchNetflixWithGenre: (id)=>{return `/discover/tv?api_key=${API_KEY}&with_networks=213&&with_original_language=en&with_genres=${id}`},
    fetchTopRatedWithGenre: (id)=>{return `/movie/top_rated?api_key=${API_KEY}&&with_original_language=en&with_genres=${id}`},
    fetchAllWithGenre: (id, page)=>{return `discover/movie?api_key=${API_KEY}&with_original_language=en&with_genres=${id}&page=${page}`},
    fetchSearch: (query, page)=>{return `/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=en-US&with_original_language=en`}
}
export default requests