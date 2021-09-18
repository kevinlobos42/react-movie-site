import { useDispatch, useSelector } from 'react-redux'
import { changeImg, selectUser } from '../../features/counter/userSlice'
import {Button} from'@material-ui/core'
import Nav from '../Home/Nav'
import './css/Profile.css'
import { useState } from 'react'
import {storage, auth} from '../../firebase'

import Plans from './Plans'


function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [file, setFile] = useState(user.img)
    const [value, setValue] = useState(user.email)
    const changeImage=(e)=>{
        const ref = storage.ref('users/'+user.uid+'/profile.jpg');
        ref.put(e.target.files[0])
        setFile(window.URL.createObjectURL(e.target.files[0]))
        dispatch(changeImg(window.URL.createObjectURL(e.target.files[0])))
    }
    const changeEmail =()=>{
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(user.email!==value && emailRegex.test(String(value).toLocaleLowerCase())){
            auth.currentUser.updateEmail(value).then(()=>{
                //EMAIL CHANGED
            }).catch((err)=>{
                // EMAIL NOT CHANGED
                console.log(err.message)
            })
        }
    }
    return (
        <div className="profile">
            <Nav />
            <div className="profile__body">
                <h1>Edit Profile</h1>
                <div className="profile__info">
                    <div className="profile__pictureContainer">
                        <img src={file} alt="Profile"/>
                        <div>
                            <input
                                className="noDisplay"
                                accept="image/png, image/jpeg"
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={changeImage}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                <p>Change Picture</p>
                                </Button>
                            </label>
                        </div>
                    </div>
                    <div className="profile__details">
                        <div className="flex">
                            <input type="text" className="" value={value} onChange={(e)=>setValue(e.target.value)} />
                            <Button 
                            variant="contained" color="primary"
                            component="span"
                            className="inputButton"
                            onClick={changeEmail}
                            ><p>Change Email</p></Button>
                        </div>
                        <div className="profile__plans">
                            <h3>Plans</h3>
                            <Plans />
                            <button onClick={()=>auth.signOut() }            className="profile__signOut">Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile
