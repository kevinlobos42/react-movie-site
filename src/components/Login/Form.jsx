import { useState, useRef } from 'react'
import {auth} from '../../firebase'
import './css/Form.css'

function Form() {
    const [hasAccount, setHasAccount] = useState(true)
    const [emailIssue, setEmailIssue] = useState(null)
    const [passwordIssue, setPasswordIssue] = useState(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const register=(e)=>{
        e.preventDefault();
        const valid = isValid('N')
        if(valid){
            auth.createUserWithEmailAndPassword(emailRef.current.value,passwordRef.current.value).then((authUser)=>{
                // storage.ref('users/'+authUser.user.uid+'/profile.jpg').put(profileImg).then(()=>{
                //     console.log('Image Uploaded')
                // });
            }).catch(err=>{
                alert(err.message)
            });
        }
    }
    const signIn = (e)=>{
        e.preventDefault();
        const valid = isValid('E')
        if(valid){
            auth.signInWithEmailAndPassword(emailRef.current.value,passwordRef.current.value).then(authUser=>{
                setEmailIssue(null)
            }).catch(err=>{
                setEmailIssue(<p className="alert">* Invalid Email</p>)
            })
        }
    }
    const isValid = (user)=>{
        switch(user){
            case 'N':
                if(emailRef.current.value==='' || passwordRef.current.value==='' || confirmPasswordRef.current.value===''){
                    return false;
                }else{
                    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
                    const emailTest = emailRegex.test(String(emailRef.current.value).toLowerCase());
                    const passwordTest = passwordRegex.test(String(passwordRef.current.value));
                    const passwordEqual = passwordRef.current.value === confirmPasswordRef.current.value;
                    setEmailIssue(!emailTest ? (<p className="alert">* Invalid Email</p>):null )
                    setPasswordIssue(!passwordTest ? (<p className="alert">* Invalid Password</p>): !passwordEqual ? (<p className="alert">* Passwords do not match</p>):null)
                    return emailTest && passwordTest && passwordEqual;
                }

            case 'E':
                if(emailRef.current.value==='' || passwordRef.current.value===''){
                    return false;
                }else{
                    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
                    const emailTest = emailRegex.test(String(emailRef.current.value).toLowerCase());
                    const passwordTest = passwordRegex.test(String(passwordRef.current.value));
                    setEmailIssue(!emailTest ? (<p className="alert">* Invalid Email</p>):null )
                    setPasswordIssue(!passwordTest ? (<p className="alert">* Invalid Password</p>) : null)
                    return emailTest && passwordTest
                }
            default:
                break;
        }
        return true;
    }
    return (
        <div>
            {hasAccount ?
                <div className="signInForm">
                    <form>
                        <h1>Sign In</h1>
                        <div>
                            <input
                                placeholder="Email address" type="email"
                                ref={emailRef}
                            />
                            <input
                                placeholder="password"
                                ref={passwordRef} type="password"
                            />
                        </div>
                        {emailIssue && emailIssue}
                        {passwordIssue && passwordIssue}
                        <button
                            type="submit"
                            onClick={signIn}>
                            Sign In
                        </button>
                    </form>
                    <p>New to Binge? <span href="#" 
                            className="signInForm__signUp"
                            onClick={()=>setHasAccount(false)}>
                        Sign up now.
                        </span>
                    </p>
                </div>
                :
                <div className="signInForm">
                    <form>
                        <h1>Sign Up</h1>
                        <div>
                            <input 
                                placeholder="Email address"
                                ref={emailRef} 
                                type="email" 
                            />
                            <input
                                placeholder="Password"
                                ref={passwordRef} type="password"
                            />
                            <input
                                placeholder="Confirm password"
                                ref={confirmPasswordRef}
                                type="password"
                            />
                        </div>
                        {emailIssue && emailIssue}
                        {passwordIssue && passwordIssue}
                        <button
                            type="submit"
                            onClick={register}>
                            Sign Up
                        </button>
                    </form>
                    <p>Already have an account? <span 
                            className="signInForm__signUp"
                             onClick={(e)=>setHasAccount(true)}
                        >
                        Sign in here.
                        </span>
                    </p>
                </div>
            }
        </div>
    )
}

export default Form
