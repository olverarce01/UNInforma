import React, {useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {doc, getDoc} from "firebase/firestore";
import db from '../firebase';
import { useAuth } from '../context/authContext';
import { async } from '@firebase/util';
import { Alert } from './Alert';


export default function Login() {
  const {login, loginWithGoogle, resetPassword} = useAuth();

  const[user,setUser]=useState({
    email:'',
    password:''
  });
  const [error, setError]= useState();

  const navigate = useNavigate();


  const handleChange = ({target:{name,value}})=>{
    setUser({...user,[name]:value});
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  try {
    await login(user.email, user.password);
    navigate("/");
  } catch (error) {
    if((error.code ==="auth/internal-error")||( error.code === "auth/invalid-email")){
      setError('Correo invalido');
    }
    else if(error.code === "auth/weak-password"){
      setError('Contraseña demasiado corta');
    }
    else{
      setError(error.message);
    }
  }
};
 
const handleGoogleSignin = async () =>{
try {

await loginWithGoogle();
navigate("/")
} catch (error) {
  setError(error.message);  
}
};

const handleResetPassword = async () =>{
  if(!user.email) return setError("Please enter your email");
  try {
    await resetPassword(user.email);
    setError('we sent you an email with a link to reset your password');
  } catch (error) {
    setError(error.message);
  }
};
  return (
    <div>
      {error && <Alert message={error}/>}
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' placeholder='youremail@company.ltd'
        onChange={handleChange}
        />

        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password'
        onChange={handleChange}
        />
        <button>Login</button>

        <a href='#!' onClick={handleResetPassword}>Forgot Password?</a>

      </form>
      <p>Don't have an Account <Link to='/signup'>Register</Link></p>
      <button onClick={handleGoogleSignin}>Google Login</button>
  </div>
  );
}
