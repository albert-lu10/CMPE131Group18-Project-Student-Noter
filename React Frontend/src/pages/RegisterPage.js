import React, { useState, useEffect} from "react";
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import './RegisterPage.css'

const Register = () => {
    // let {authTokens} = useContext(AuthContext)

    const [errors, setErrors] = useState({});
    const history=useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [values, setValues]=useState({
        username:'',
        password:'',
        password2:'',
        first_name:'',
    })
    const validate=(values)=>{    
        let errors = {};
        if (!values.username.trim()) {
        errors.username = 'Username required';
        }

        if (!values.password) {
        errors.password = 'Password is required';
        } else if (values.password.length < 6) {
        errors.password = 'Password needs to be 6 characters or more';
        }
    
        if (!values.password2) {
        errors.password2 = 'Confirmation password is required';
        } else if (values.password2 !== values.password) {
        errors.password2 = 'Passwords do not match';
        }
        if (!values.first_name.trim()) {
            errors.first_name = 'Please enter your name';
        }
        return errors;
    }
    
    useEffect(
        () => {
            if (Object.keys(errors).length === 0 && isSubmitting){
                console.log(errors)
            }
        },
        [errors]
      );
    const handleChange= e =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit= async (e)=>{
        e.preventDefault()
        setErrors(validate(values))
        setIsSubmitting(true)
        if (Object.keys(validate(values)).length === 0){
            let response = await fetch('/api/register/', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value,'first_name':e.target.first_name.value})
            })
            console.log(response.status);
            if (response.status==201){
                history('/')
                window.location.reload();
            }
        }

    }

    return (
        <div className="reg">
            <p className="Title"> Student Noter</p>
            <div className="form1">
            <h1 className="reg-txt">Register</h1>
            <form onSubmit={handleSubmit}     style={{ flexDirection: 'row' }}> 
                <input className="input" type="text" name="username" placeholder="Enter username" value={values.username} onChange={handleChange}/>
            <br/>
            {errors.username && <p className="error">{errors.username}</p>}
            <br/>
                <input className="input" type="password" name="password" placeholder="Enter password" value={values.password} onChange={handleChange}/>
                <br/>
                {errors.password && <p  style={{ flexShrink: 1 }}    className="error">{errors.password}</p>}

                <br/>

                <input className="input"  type="password" name="password2" placeholder="Confirm password" value={values.password2} onChange={handleChange}/>
                <br/>
                {errors.password2 && <p className="error">{errors.password2}</p>}
                <br/>
                <input className="input"  type="text" name="first_name" placeholder="Your Name" value={values.first_name} onChange={handleChange}/>
                {errors.first_name && <p className="error">{errors.first_name}</p>}
                <br/>
                <button className="regsub" type="submit" value="Register"> Register</button>
            </form>
            <p>Already have an account? <Link style={{textDecoration: 'none'}  }  to="/">Log In</Link></p>

            </div>  

            
        </div>
    )
}

export default Register
