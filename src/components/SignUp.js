import React, {useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {doc, getDoc} from "firebase/firestore";
import db from '../firebase';
import { useAuth } from '../context/authContext';
import { async } from '@firebase/util';
import { Alert } from './Alert';


export default function SignUp() {
  const {signup} = useAuth();

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
    await signup(user.email, user.password);
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
        <button>Register</button>
      </form>
  </div>
  );
}
