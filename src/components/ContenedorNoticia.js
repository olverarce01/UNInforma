import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {doc, getDoc} from "firebase/firestore";
import db from '../firebase';
import { useAuth } from '../context/authContext';
import styles from './ContenedorNoticia.module.css';

async function consulta(id2,setDescripcion,setTipo,setTitulo,setUrl,setPoligono){

  const docRef = doc(db, "Posters", id2);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    setDescripcion(docSnap.data().descripcion);
    setTipo(docSnap.data().tipo);
    setTitulo(docSnap.data().titulo);
    setPoligono(docSnap.data().poligono);
    setUrl(docSnap.data().urlArchivo);
    
  } else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
  }
}

export default function ContenedorNoticia() {
  const [descripcion,setDescripcion]=useState("");
  const [tipo,setTipo]=useState("");
  const [titulo,setTitulo]=useState("");
  const [poligono,setPoligono]=useState("");
  const [url,setUrl]=useState("");
  
  const {loading} = useAuth();


  let {id}=useParams();
  let {id2}=useParams();


useEffect(() => {
  consulta(id2,setDescripcion,setTipo,setTitulo,setUrl,setPoligono);
});

  if(loading) return <div className="containerLoading"><img src="../loading.gif" width="600px"/></div>


  return (
    <div className={styles.noticia} key={id2}>

    
    <div className={styles.titulo}>{titulo}</div>
    <div className={styles.contenido}>{descripcion}</div>
    <div className={styles.tipo}>{tipo}</div>
    <img src={url} alt="imagenNoticia" className={styles.img}/>


  </div>
  );
}
