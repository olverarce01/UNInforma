import db, { storage } from "../firebase";
import React, {useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "../context/authContext";
import styles from "./CrearNoticia.module.css";

import { addDoc, collection } from "firebase/firestore";


export default function CrearNoticia() {
  
  const {user, loading} = useAuth();
  let {id}=useParams();
  const [progress, setProgress]= useState(0);

  const[noticia,setNoticia]=useState({
    titulo: '',
    descripcion:'',
    urlArchivo:'',
    tipo:'robo'
  });
  const formHandler = (e) =>{
    e.preventDefault();

    const file= e.target[2].files[0];
    uploadFiles(file);
  };
  const crearDocumento = async(url) =>{
    setNoticia({...noticia,autor: user.email, poligono: id, urlArchivo: url});

    const docRef = await addDoc(collection(db, "Posters"), {"autor": user.email, "poligono" :id, "titulo": noticia.titulo,
     "descripcion" : noticia.descripcion, "urlArchivo": url, "tipo": noticia.tipo});
    console.log("Document written with ID: ", docRef.id)
  };


  const uploadFiles = (file) =>{
    if(!file) return;
    const storageRef = ref(storage, `/fotos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", (snapshot)=>{
      const prog = Math.round((snapshot.bytesTransferred/ snapshot.totalBytes)*100);
      setProgress(prog);
    }, (err)=> console.log(err),
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((url)=> 
      {
        crearDocumento(url);
      }
      );
    }
    );
  };

  const handleChange = ({target:{name,value}})=>{
    setNoticia({...noticia,[name]:value});
  };


  if(loading) return <div className="containerLoading"><img src="../loading.gif" width="600px"/></div>

  return (
    <div className={styles.containerCrearNoticia}>
      <h1 className={styles.titulo}>Crea una noticia</h1>
      <form onSubmit={formHandler} className={styles.formulario}>
          <div className={styles.divForm}>
            Autor: <a className={styles.userDate}>{user.displayName || user.email}</a>
          </div>
          <div className={styles.divForm}>
            Sector: <a className={styles.userDate}>{id}</a>
          </div>
          <div className={styles.divForm}>
            Titulo:
            <input type="titulo" name="titulo" placeholder="titulo" onChange={handleChange}/>
          </div>
          <div className={styles.divForm}>
            Descripcion:
            <input type="descripcion" name="descripcion" placeholder="descripcion" onChange={handleChange}/>
          </div>
          <div className={styles.divForm}>
            Añada una imagen:
            <input type="file" className="input" id="inputFile" accept="image/png, image/gif, image/jpeg"/>
          </div>
          <div className={styles.divForm}>
            Seleccione el tipo de suceso:
            <select name="tipo" id="tipo" onChange={handleChange} value={noticia.tipo} className={styles.selection}>
              <option value="robo" selected="selected">Robo</option>
              <option value="asalto">Asalto</option>
            </select>
          </div>
          <div className={styles.submit}>
            <button type="submit" className={styles.button}>Subir</button>
            <h3>Subido {progress} %</h3>   
          </div>       
      </form>

  </div>
  );
}
