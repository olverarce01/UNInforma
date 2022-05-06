import React, {useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Alert } from './Alert';
import styles from "./Login.module.css";


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
    <div className={styles.containerForm}>
      {error && <Alert message={error}/>}
      <h1 className={styles.titulo}>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.itemForm}>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' placeholder='youremail@company.ltd'
            onChange={handleChange}
            />
        </div>

        <div className={styles.itemForm}>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password'
            onChange={handleChange}
            />
        </div>

        <button className={styles.button}>Login</button>

        <a href='#!' onClick={handleResetPassword} className={styles.links}>Forgot Password?</a>

      </form>
      <p>Don't have an Account <Link to='/signup' className={styles.links}>Register</Link></p>
      <button onClick={handleGoogleSignin} className={styles.button}>Google Login</button>
  </div>
  );
}
