import React, {createContext,useState,useEffect} from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'
const AuthContext=createContext()

export default AuthContext;



export const AuthProvider=({children})=>{
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)
    let [category, setCategory]=useState([]);

    // const []=useState()
    const history=useNavigate()
    function hasValue(obj, key, value) {
        return obj.hasOwnProperty(key) && obj[key] === value;
    }
    let loginUser = async e=> {
        try{
        e.preventDefault()
        let response = await fetch('/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        console.log(response.status)
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history('/daily')
            let categoryResponse =await fetch("/api/category", {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(data.access)
                }
              })
              let categoryData= await categoryResponse.json()
        console.log(categoryData.some(function(cat) { return hasValue(cat, "name", "No category"); }))
              
        if (categoryData.some(function(cat) { return hasValue(cat, "name", "No category"); })==false){
          let noCatResponse = await fetch('/api/category-create/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
                'Authorization':'Bearer ' + String(data.access),
            },
            body:JSON.stringify({  
                "name": "No category"})
        })
        let catData = await noCatResponse.json()
        console.log(catData)
    }

        }else if (response.status==401){
            throw Error('Incorrect username or password') 
        }
        else if (response.status==400){
            throw Error('Please enter username and password') 
        }
        }
        catch(e){
            setError(e.message)
        }
    
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/')
        setError(null)
    }
    let updateToken = async ()=> {
        let response = await fetch('/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }
    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        error:error,
        setError:setError,
    }

    useEffect(()=>{
     
        if(loading){
     
            updateToken()
        
        }
        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)
        
    }, [authTokens, loading])
        
    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
        

















