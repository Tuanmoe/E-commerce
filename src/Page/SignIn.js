import React, { useState } from 'react'
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase'
import './SignIn.scss'
import {useDispatch} from 'react-redux'
import {login} from '../redux/authReducer'
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")
  const [error,setError] =useState(false)
  const [messageEmail,setMessageEmail] =useState(false)
  const [messagePassword,setMessagePassword]=useState(false)

  const dispatch =useDispatch()
  const navigate=useNavigate()

  const handleSubmit=(e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    dispatch(login())
    navigate('/')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    if(email.length!==0 && password.length!==0)
    setError(true)
  });
  if(email.length===0)
    setMessageEmail(true)
  if(password.length===0)
    setMessagePassword(true)
  }
  const signUpNow = ()=> {
    navigate("/SignUp",{replace:true})
  }
  return (
    <div className="signIn_wrapper">
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='email' 
            onChange={(e)=>setEmail(e.target.value) }
            onFocus={()=> {
              setError(false)
              setMessageEmail(false)
            }}
            >
          </input>
          {messageEmail && <span>⚠️Please enter your Email!</span>}
          <input type="password" placeholder="password" 
              onChange={(e)=>setPassword(e.target.value)}
              onFocus={()=>{
                setError(false)
                setMessagePassword(false)
              }}>
          </input>
          {messagePassword && <span>⚠️Please enter your Password!</span>}
           <button type="submit" >Login</button>
           <span className="forgot_pass">Forgot Password?</span>
           {error && <span className="infor_wrong">Your email or password is incorrect.</span>}
           < div className="Oauth">
                    <button>Login with Google</button>
                    <button>Login with Facebook</button>        
           </div>
           <p >You haven't account?<span className="signUp_now" onClick={signUpNow}>Sign Up Now!</span></p>
       </form>
    </div>
  )
}

export default SignIn
