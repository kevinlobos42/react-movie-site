import axios from '../../axios';
import requests from '../../Requests'
import { useEffect, useState } from 'react';
import './css/Movie.css'
import { useLocation } from 'react-router';

function Movie() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const location = useLocation();
    const [movie,setMovie] = useState({});
    const [cast, setCast] = useState()
    const [director, setDirector] = useState()
    const [writers, setWriters] = useState()
    useEffect(()=>{
        async function fetchMovie(){
            const req = await axios.get(requests.fetchMovieDetails(id))
            setMovie(req.data)
            return req;
        }
        async function fetchCast(){
            const req = await axios.get(requests.fetchMovieCast(id))
            const actors =[]
            console.log(req.data)
            for(let i=0; i< (req.data.cast.length > 5 ? 5: req.data.cast.length); i++){
                actors.push(req.data.cast[i])
            }
            setDirector(req.data.crew.filter(crew=>{return crew.job==='Director'})[0])
            setWriters(req.data.crew.filter(crew=>{return (crew.job==='Writer' || crew.job==='Book')}))
            setCast(actors)      
            return req
        }
        async function fetchSimilar(){

        }
        async function fetchRecommended(){

        }
        fetchMovie();
        fetchCast()
    },[location,id])
    // console.log(movie)
    console.log(cast)
    console.log(director)
    console.log(writers)
    return (
        <div className="movie">
            
        </div>
    )
}
export default Movie
