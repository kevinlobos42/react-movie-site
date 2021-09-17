import { useState, useEffect, useRef } from 'react';
import {FaSearch} from 'react-icons/fa'
import {AiFillCaretDown} from 'react-icons/ai'
import {useHistory} from'react-router-dom'
import axios from '../../axios'
import requests from '../../Requests'
import './css/Nav.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/counter/userSlice';

function Nav() {
    const user = useSelector(selectUser);
    const [show,setShow] = useState(false);
    const [genres, setGenres] = useState([])
    const [img, setImg] = useState(user.img)
    const history = useHistory()
    const searchInput = useRef()

    const navbarScroll = ()=>{
        if(window.scrollY>100){
            setShow(true)
        }else{
            setShow(false)
        }
    }
    useEffect(()=>{
        async function fetchData(){
            const req = await axios.get(requests.fetchGenres)
            setGenres(req.data.genres)
            return req
        }
        fetchData()
        window.addEventListener('scroll', navbarScroll)
        return ()=>window.removeEventListener('scroll', navbarScroll)
    },[])
    useEffect(()=>{
        setImg(user.img)
    },[user.img])
    const search=()=>{
        const val = searchInput.current.value
        if(val.trim()===''){
            return;
        }
        history.push(`/search?q=${val}`)
    }
    return (
        <div className={`nav ${show && 'nav__black'} ${!show && 'nav--fade'}`}>
            <div className="nav__contents">
                <h2 className="nav__logo" onClick={()=>history.push('/')}>Binge </h2>
                <div className="nav__dropdown">
                    <div className="nav__dropdown-title">Genres<AiFillCaretDown/></div>
                    <div className="nav__dropdown-menu">
                        {genres && genres.map(genre=>(<p key={genre.id} onClick={()=>history.push(`/genre/${genre.name}/${genre.id}`)}>{genre.name}</p>))}
                    </div>
                </div>

                <div className="nav__options">
                    <div className="nav__search-box">
                        <input className="nav__search-text"
                        type="text" ref={searchInput} placeholder="Type to Search" />
                        <div className="nav__search-btn" onClick={()=>search()}>
                            <FaSearch />
                        </div>
                    </div>
                    <img
                        onClick={()=>history.push('/profile')}
                        className="nav__avatar" 
                        src={img}
                        alt="Profile"
                    />
                </div>
            </div>
        </div>
    )
}

export default Nav
