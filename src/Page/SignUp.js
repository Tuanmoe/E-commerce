import React, { useState } from 'react'
import './SignUp.scss'
import {  createUserWithEmailAndPassword } from "firebase/auth"
import {auth} from '../firebase'
import { useNavigate} from 'react-router-dom'

const SignUp = () => {

  const [email,setEmail]=useState("")
  const [messageEmail,setMessageEmail] =useState(false)
  const [password,setPassword]=useState("")
  const [messagePassword,setMessagePassword]=useState(false)
  const [longPassword,setLongPassword]=useState(false)
  const [strengthPassword,setStrengthPassword]=useState(['weak','medium','strong'])

const navigate=useNavigate()


const handleSubmit=(e)=>{
  e.preventDefault();
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user
    navigate('/SignIn',{replace:true})
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    console.log(errorCode)
  });
  if(email.length===0)
    setMessageEmail(true)
  if(password.length===0)
    setMessagePassword(true)
  if(password.length!==0 && password.length<6)
    setLongPassword(true)
}
const LoginNow=()=> {
  navigate('/SignIn',{replace:true})
}

  return (
    <div className="signUp_wrapper">
       <form onSubmit={handleSubmit}>
          <input type="email" placeholder='email' 
            onChange={(e)=>setEmail(e.target.value) }
            onFocus={()=>setMessageEmail(false)}>
          </input>
           {messageEmail && <span>⚠️Please enter your Email!</span>}
          <input type="password" placeholder="password" 
              onChange={(e)=>setPassword(e.target.value)}
              onFocus={()=>{
                setMessagePassword(false)
                setLongPassword(false)
              }}>
          </input>
           {messagePassword && <span>⚠️Please enter your Password!</span>}
           {longPassword && <span>⚠️Your password must contain at least 6 characters.Password should contain at least 8 characters,one uppercase letter, one lowercase letter, one digit and one special character.</span>}
           <button type="submit" >Sign Up</button>
           < div className="Oauth">
                    <button>Continue with Google</button>
                    <button>Continue with Facebook</button>        
           </div>
           <p>Already have an account?<span onClick={LoginNow}>Login Now!</span></p>
       </form>
    </div>
  )
}

export default SignUp
