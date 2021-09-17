import Nav from '../Home/Nav'
import './css/Genre.css'
import requests from '../../Requests' 
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Row from '../Home/Row'
import AllMovies from './AllMovies'

function Genres(props) {
    const location = useLocation();
    const [genreId,setGenreId] = useState(window.location.pathname.split('/')[3])
    const [genreName,setGenreName] = useState(window.location.pathname.split('/')[2])
    useEffect(()=>{
        setGenreId(window.location.pathname.split('/')[3])
        setGenreName(window.location.pathname.split('/')[2])
    },[location])
    return (
        <div>
            <Nav />
            <div className="genre">
                <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixWithGenre(genreId)} isLargeRow/>
                <Row title="Top Rated" fetchUrl={requests.fetchTopRatedWithGenre(genreId)}/>
                <AllMovies title={`All ${genreName} Movies`}genre={genreId} />
            </div>
        </div>
    )
}

export default Genres