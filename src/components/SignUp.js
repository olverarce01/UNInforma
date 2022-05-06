import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Alert } from './Alert';

import styles from "./SignUp.module.css";

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
    <div className={styles.containerForm}>
      {error && <Alert message={error}/>}
      <h1 className={styles.titulo}>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' placeholder='youremail@company.ltd'
          onChange={handleChange}
        />
        </div>

        <div className={styles.formItem}>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password'
          onChange={handleChange}
          />
        </div>
        <button className={styles.button}>Register</button>
      </form>
  </div>
  );
}
