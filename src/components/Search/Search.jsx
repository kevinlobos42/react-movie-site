import {useState, useEffect} from 'react'
import { useLocation } from "react-router";
import { GrLinkNext } from "react-icons/gr";
import Nav from "../Home/Nav";
import axios from "../../axios";
import requests from '../../Requests'
import './css/Search.css'
import { Button } from '@material-ui/core';

function Search() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    const location = useLocation();
    const [movies, setMovies] = useState();
    const [movies2, setMovies2] = useState();
    const [page,setPage] = useState(2)
    const [pageLimit,setPageLimit] = useState(100)
    const base_url = "https://image.tmdb.org/t/p/original/"
    useEffect(()=>{
        async function fetchData(){
            const req = await axios.get(requests.fetchSearch(searchQuery,page-1))
            setPageLimit(req.data.total_pages)
            setMovies(req.data.results);
            return req
        }
        async function fetchData2(){
            const req = await axios.get(requests.fetchSearch(searchQuery,page))
            setMovies2(req.data.results);
            return req
        }
        fetchData()
        fetchData2()
    },[location, searchQuery, page])
    useEffect(()=>{
        setPage(2)
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
    const nextPage = ()=>{
        if(page!==pageLimit && pageLimit-2 >= page){
            setPage(page+2)
            document.getElementById('searchMovies').scrollIntoView(true)

        }else if(page !== pageLimit && pageLimit -1 >=page){
            setPage(page+1)
            document.getElementById('searchMovies').scrollIntoView(true)
        }
    }
    const previousPage = ()=>{
        if(page <= 2){
            return
        }else{
            setPage(page-2)
            document.getElementById('searchMovies').scrollIntoView(true)
        }
    }
    return (
        <div className="searchPage">
            <Nav />
            <div className="search" id="searchMovies">
                <h2 className="search__title">Results for '{searchQuery}'</h2>
                <div className="search__posters">
                    {movies && movies.map((movie, idx)=>displayMovie(movie,idx))}
                    {movies2 && movies2.map((movie,idx)=>displayMovie(movie,idx))}
                </div>
            </div>
            <div className="button-container">
                <Button variant="contained" color="primary" onClick={()=>previousPage()}>
                    <h5>Previous Page</h5></Button>
                <Button variant="contained" color="primary" onClick={()=>nextPage()}><h5>Next Page</h5></Button>
            </div>
        </div>
    )
}

export default Search
