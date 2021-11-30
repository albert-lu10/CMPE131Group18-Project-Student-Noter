import React, {useContext,useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import './LogInPage.css'
import { Link} from "react-router-dom";

const LogInPage = () => {
    let {authTokens, logoutUser} = useContext(AuthContext)

    let {loginUser}=useContext(AuthContext)
    let {error,setError}=useContext(AuthContext)
    // useEffect(()=>{console.log(error)},[error])
    let clearError = () => {
        setError(null)
    }
    return (
        <div className="LogIn">
            <p className="Title"> Student Noter</p>
            <div className="form2">
            <h1 className="login-txt">Log In</h1>
            <form className="signInForm" onSubmit={loginUser}> 
                <input className="us"  type="text" name="username" placeholder="Enter username" />
            <br/>
                <input className="pw" type="password" name="password" placeholder="Enter password"/>
            <br/>
            {error && <p className="error"> {error}</p>}
            {/* <p style={{display: error ? "block" : "none", color: "red"}}> {error}</p> */}
                <input className="loginsub" type="submit" value="Log In"/>
            </form>
            <p className="">Don't have an account? <Link style={{textDecoration: 'none'}} onClick={clearError}  id="connect" to="/register">Register</Link></p>
            </div>  
        

        </div>
    )
}
export default LogInPage
