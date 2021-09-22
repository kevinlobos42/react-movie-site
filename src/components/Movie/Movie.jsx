import axios from '../../axios';
import requests from '../../Requests'
import { useEffect, useState } from 'react';
import './css/Movie.css'
import { useHistory, useLocation } from 'react-router';
import { GrLinkNext } from 'react-icons/gr';
import { AiFillCloseCircle } from 'react-icons/ai';

function Movie({setMovieID}) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const location = useLocation();
    const [movie,setMovie] = useState();
    const [cast, setCast] = useState()
    const [director, setDirector] = useState()
    const [similar, setSimilar] = useState()
    const base_url = "https://image.tmdb.org/t/p/original/"
    const [recommended, setRecommended] = useState()
    const history = useHistory();
    useEffect(()=>{
        async function fetchMovie(){
            const req = await axios.get(requests.fetchMovieDetails(id))
            setMovie(req.data)
            return req;
        }
        async function fetchCast(){
            const req = await axios.get(requests.fetchMovieCast(id))
            const actors =[]
            for(let i=0; i< (req.data.cast.length > 5 ? 5: req.data.cast.length); i++){
                actors.push(req.data.cast[i])
            }
            setDirector(req.data.crew.filter(crew=>{return crew.job==='Director'})[0])
            setCast(actors)      
            return req
        }
        async function fetchSimilar(){
            const req = await axios.get(requests.fetchMovieSimilar(id));
            setSimilar(req.data.results.filter(m=> {return movie?.id!==m.id}))
            return req;
        }
        async function fetchRecommended(){
            const req = await axios.get(requests.fetchMovieRecommended(id));
            setRecommended(req.data.results)
            return req;
        }
        fetchMovie();
        fetchCast();
        fetchSimilar();
        fetchRecommended();
    },[location,id])

    const releaseDate = (movie)=>{
        if(movie?.release_date){
            return movie.release_date.substring(0,4)
        }
    }
    const runtime = (movie)=>{
        if(!movie) return ''
        let numMinutes = movie.runtime;
        let hours = (numMinutes/60)
        let rhours = Math.floor(hours)
        let minutes = (hours-rhours) * 60;
        let rminutes = Math.floor(minutes);
        return rhours+'hr '+rminutes+'min'
    }
    const displayGenres = ()=>{
        const genres=[]
        for(const genre of movie.genres){
            genres.push(genre.name)
        }
        return genres.join(', ')
    }
    const displayCast = ()=>{
         const actorNames =[]
        for(const actor of cast){
            actorNames.push(actor.name)
        }
        return actorNames.join(', ')
    }
    return (
        <div className="movie">
            <div className="movie__backdrop" style={{backgroundSize:'cover',backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,backgroundPosition:'center center', backgroundRepeat:'no-repeat'}}>
                <div className="top-right" onClick={()=>{setMovieID(null)}}>
                    <AiFillCloseCircle/>
                </div>
                <div className="movie__content">
                    <h1 className="movie__title">{movie?.original_title || movie?.name || movie?.original_name}</h1>
                    <div className="movie__buttons">
                        <button className="movie__btn"><p>Play</p></button>
                    </div>
                </div>
                <div className="fade--bottom"></div>
                <div className="fade--allSides"></div>
            </div>
            <div className="movie__details">
                <div className="left">
                    <p>{releaseDate(movie)} | {runtime(movie)}</p>
                    <h1 className="movie__desc">{movie?.overview}</h1>
                </div>
                <div className="right">
                    <p><span>Cast: </span>{cast && displayCast()}</p>
                    <p><span>Director: </span> {director?.name}</p>
                    <p><span>Genres: </span>{movie && displayGenres()}</p>
                </div>
            </div>

            <div className="movie__similar">
                <h2>More Like This</h2>
                <div className="movies__similar__container">
                {similar && similar.map(movie=>(
                    <div className="movies__similar__movie" key={movie.id} onClick={()=>history.push('/?id='+movie.id)}>
                        <div className="img">
                            <img src={base_url+movie.backdrop_path}/>
                            <div className='hover'>
                                    <GrLinkNext />
                                </div>
                        </div>
                        <h4>{movie.original_title || movie.original_name}</h4>
                        <p>{releaseDate(movie)}</p>
                    </div>
                    ))}
                </div>
            </div>
            <div className="lineBreak"></div>
            <div className="movies__recommended">
                <h2>Recommended</h2>
                <div className="movies__recommended__container">
                    {recommended && recommended.map(movie=>(
                        <div className="movies__recommended__movie" key={movie.id} onClick={()=>history.push('/?id='+movie.id)}>
                            <div className="img">
                                <img src={base_url+movie.backdrop_path}/>
                                <div className='hover'>
                                    <GrLinkNext />
                                </div>
                            </div>
                            <h4>{movie.original_title || movie.original_name}</h4>
                            <p>{releaseDate(movie)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Movie
