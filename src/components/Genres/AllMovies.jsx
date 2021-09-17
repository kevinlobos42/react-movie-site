import axios from '../../axios'
import { useEffect, useState } from 'react'
import requests from '../../Requests'
import './css/AllMovies.css'
import { GrLinkNext } from 'react-icons/gr'
function AllMovies({title, genre}) {
    const [page,setPage] = useState(2)
    const [movies,setMovies] = useState([])
    const [secondSetMovies,setSecondSetMovies] = useState([])
    const base_url = "https://image.tmdb.org/t/p/original/"

    useEffect(()=>{
        async function fetchData(){
            const req = await axios.get(requests.fetchAllWithGenre(genre,page-1))
            setMovies(req.data.results)
            return req
        }
        async function fetchData2(){
            const req = await axios.get(requests.fetchAllWithGenre(genre,page))
            setSecondSetMovies(req.data.results)
            return req
        }
        fetchData()
        fetchData2()
    },[genre, page])

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

    return (
        <div className="allMovies">
            <h2 className="allMovies__title">{title}</h2>
            <div className="allMovies__posters">
                {movies && movies.map((movie,idx)=>(
                    (movie.backdrop_path) && (
                        <div key={idx} className="allMovies__movie">
                            <div className="allMovies__image__container">
                                <img className="allMovies__poster" alt={movie.name} src={`${base_url}${movie.backdrop_path}`}/>
                                <div className='hover'>
                                    <GrLinkNext />
                                </div>
                            </div>
                            <h4 className="allMovies__movie__title">
                                {movie?.original_title || movie?.name || movie?.original_name}
                            </h4>
                            <p className="allMovies__movie__details">{releaseDate(movie)}</p>
                            <p className="allMovies__movie__details">{language(movie)}</p>
                        </div>
                    )
                ))}
                {secondSetMovies && secondSetMovies.map((movie,idx)=>(
                    (movie.backdrop_path) && (
                        <div key={idx}  className="allMovies__movie">
                            <div className="allMovies__image__container">
                                <img className="allMovies__poster" alt={movie.name} src={`${base_url}${movie.backdrop_path}`}/>
                                <div className={`hover`}>
                                    <GrLinkNext />
                                </div>
                            </div>
                            <h4 className="allMovies__movie__title">
                                {movie?.original_title || movie?.name || movie?.original_name}
                            </h4>
                            <p className="allMovies__movie__details">{releaseDate(movie)}</p>
                            <p className="allMovies__movie__details">{language(movie)}</p>
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default AllMovies
