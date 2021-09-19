import './App.css';
import {useEffect} from 'react'
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import profileImg from './profileImg.jpg'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { auth, storage } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/counter/userSlice';
import Profile from './components/Profile/Profile';
import Genres from './components/Genres/Genres';
import Search from './components/Search/Search';
import Movie from './components/Movie/Movie';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth=>{
      if(userAuth){
        const image = storage.ref('users/' + userAuth.uid+'/');
        image.child('profile.jpg').getDownloadURL().then((url)=>{
          dispatch(login({
            uid: userAuth.uid,
            email: userAuth.email,
            img: url
          }))
        }).catch(err=>{
          dispatch(login({
            uid: userAuth.uid,
            email: userAuth.email,
            img: profileImg
          }))
          switch(err.code){
            case 'storage/object-not-found':
              console.log('File not found')
              break;
            case 'storage/unauthorized':
              console.log('Permissions not met')
              break;
            case 'storage/canceled':
              console.log('Upload canceled')
              break;
            case 'storage/unknown':
              console.log('Unknown Error')
              break;
            default:
              break;
          }
        })
        //logged in
        
      }else{
        // not logged in
        dispatch(logout())
      }
    })
    return unsubscribe;
  },[dispatch])
  return (
    <div className="app">
      {/* If signed in and plan selected, Home screen, else if signed in and no plan, plan screen, else sign up/ in screen */}
      {!user ? (
        <Login />
      ): (
        <Router>
          <Switch>
            <Route path="/" exact >
              <Home />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path='/genre/:id'>
              <Genres id={window.location.pathname.split('/')[3]}/>
            </Route>
            <Route path='/search'>
              <Search/>
            </Route>
            <Route path='/movie'>
              <Movie />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
