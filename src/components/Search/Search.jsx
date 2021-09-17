import {useState, useEffect} from 'react'
import { useLocation } from "react-router";
import { GrLinkNext } from "react-icons/gr";
import Nav from "../Home/Nav";
import axios from "../../axios";
import requests from '../../Requests'
import './css/Search.css'

function Search() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    const location = useLocation();
    const [movies, setMovies] = useState();
    const [movies2, setMovies2] = useState();
    const base_url = "https://image.tmdb.org/t/p/original/"
    useEffect(()=>{
        async function fetchData(){
            const req = await axios.get(requests.fetchSearch(searchQuery,1))
            setMovies(req.data.results);
            return req
        }
        async function fetchData2(){
            const req = await axios.get(requests.fetchSearch(searchQuery,2))
            setMovies2(req.data.results);
            return req
        }
        fetchData()
        fetchData2()
    },[location])
    const language = (movie)=>{
        if(movie?.original_language){
            return 'Language: '+movie.original_language.toUpperCase()
        }
    }
    const releaseDate = (movie)=>{
        if(movie?.release_date){
            return 'Year: '+movie.release_date.substring(0,4)
        }
    }
    const displayMovie = (movie, idx)=>{
        return ( (movie.backdrop_path)&&(
            <div className="search__movie" key={idx}>
            <div className="search__image__container">
                <img className="allMovies__poster" alt={movie.name} src={`${base_url}${movie.backdrop_path}`}/>
                <div className='hover'>
                    <GrLinkNext />
                </div>
            </div>
            <h4 className="search__movie__title">
                {movie?.original_title || movie?.name || movie?.original_name}
            </h4>
            <p className="search__movie__details">
                {releaseDate(movie)}</p>
            <p className="search__movie__details">        {language(movie)}</p>
        </div>
        ))
    }
    return (
        <div>
            <Nav />
            <div className="search">
                <h2 className="search__title">Results for '{searchQuery}'</h2>
                <div className="search__posters">
                    {movies && movies.map((movie, idx)=>displayMovie(movie,idx))}
                    {movies2 && movies2.map((movie,idx)=>displayMovie(movie,idx))}
                </div>
            </div>
        </div>
    )
}

export default Search