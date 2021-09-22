import { useEffect, useState } from 'react'
import axios from '../../axios'
import {GrLinkNext} from 'react-icons/gr'
import './css/Row.css'
import { useHistory, useLocation } from 'react-router'
import Movie from '../Movie/Movie'

function Row({title, fetchUrl, isLargeRow = false}) {
    const [movies, setMovies] = useState()
    const [movieID, setMovieID] = useState(null)
    const history = useHistory();
    const base_url = "https://image.tmdb.org/t/p/original/"
    useEffect(() => {
        async function fetchData(){
            const req = await axios.get(fetchUrl)
            setMovies(req.data.results)
            return req;
        }
        fetchData()
    }, [fetchUrl])
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
    useEffect(()=>{
        console.log(history.location.pathname)
        if(movieID){
            history.push('?id='+movieID)
            document.body.style.height='100vh'
            document.body.style.overflowY='hidden'
        }else{
            history.push(history.location.pathname)
            document.body.style.height='auto'
            document.body.style.overflowY='auto'
        }
    },[movieID])
    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>
            <div className={`row__posters ${isLargeRow && 'row__posters__large'}`}>
                {movies && movies.map((movie,idx)=>(
                ((isLargeRow && movie.poster_path) ||
                    (!isLargeRow && movie.backdrop_path)) && (
                        <div key={idx} onClick={()=>setMovieID(movie.id)} >
                            <div className="row__image__container" onClick={()=>setMovieID(movie.id)}>
                                <img className={`row__poster ${isLargeRow && 'row__poster__large'}`} src={`${base_url}${
                                    isLargeRow ? movie.poster_path : movie.backdrop_path
                                }`} alt={movie?.original_title || movie?.name || movie?.original_name}/>
                                <div className={`hover ${isLargeRow && 'hover__large'}`}>
                                    <GrLinkNext />
                                </div>
                            </div>
                            <h4 className="row__movie__title">{!isLargeRow && (movie?.original_title || movie?.name || movie?.original_name)}</h4>
                            <p className="row__movie__details">{!isLargeRow && releaseDate(movie)}</p>
                            <p className="row__movie__details">{!isLargeRow && language(movie)}</p>
                        </div>
                    )
                ))}
            </div>
            {movieID && (
                <div className="movie--cover">
                    <Movie setMovieID={setMovieID}/>
                </div>
            )}
        </div>
    )
}

export default Row
