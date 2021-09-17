import { useEffect, useState } from 'react';
import axios from '../../axios';
import requests from '../../Requests'
import './css/MainMovie.css'

function MainMovie() {
    const [movie, setMovie] = useState();
    useEffect(() => {
        async function fetchData(){
            const req = await axios.get(requests.fetchTrending);
            setMovie(
                req.data.results[
                    Math.floor(Math.random()* req.data.results.length-1)
                ]
            )
            return req;
        }
        fetchData();
        return () => {
            // cleanup
        }
    }, [])
    const truncateText = (text, n)=>{
        if(text?.length > n){
            let space = n;
            while(text[space] !== ' '){
                space-=1;
            }
            return text.substring(0,space)+'...'
        }else{
            return text;
        }
    }
    return (
        <header className="main" style={{backgroundSize:'cover',backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,backgroundPosition:'center center', backgroundRepeat:'no-repeat'}}>
            <div className="main__content">
                <h1 className="main__title">{movie?.original_title || movie?.name || movie?.original_name}</h1>
                <h1 className="main__desc">{truncateText(movie?.overview,150)}</h1>
                <div className="main__buttons">
                    <button className="main__btn"><p>Play</p></button>
                    <button className="main__btn main__btn__primary">
                        <p>Add to  My List</p></button>
                </div>
            </div>
            <div className="main--fadeAllSides" /> 
            <div className="main--fadeBottom" /> 
        </header>
    )
}

export default MainMovie
