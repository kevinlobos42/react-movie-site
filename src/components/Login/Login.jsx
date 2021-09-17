import { useState } from 'react'
import './css/Login.css'
import Form from './Form'
function Login() {
    const [signIn, setSignIn] = useState(false)
    return (
        <div className="login">
            <div className="login--fade" />
            <div className="login__background">
                <h2 className="login__logo">Binge</h2>
                <button className="login__btn" onClick={()=>setSignIn(true)}>
                    <h4>Sign In</h4>
                </button>
            </div>
            <div className="login__body">
                {signIn ? (<Form />): (
                    <>
                        <h1>Unlimited movies, TV shows, and more.</h1>
                        <h3>Watch anywhere. Cancel anytime.</h3>
                        <p>Ready to watch? Enter your email to create or restart your membership.</p>
                        <div className="login__email-box">
                            <input type="email" placeholder="Email address"/>
                            <button onClick={()=>setSignIn(true)}>
                            <h4>Get Started</h4>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Login
