import db, { storage } from "../firebase";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "../context/authContext";
import './CrearNoticia.css';
import { async } from "@firebase/util";
import { addDoc, collection } from "firebase/firestore";


export default function CrearNoticia() {
  
  const {user, logout, loading} = useAuth();
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


  if(loading) return <h1>cargando</h1>

  return (
    <div className="containerCrearNoticia">
      <h1>Crea una noticia</h1>
      <form onSubmit={formHandler} id="formulario">
          <div className="divForm">
            Autor: <a>{user.displayName || user.email}</a>
          </div>
          <div className="divForm">
            Sector: <a>{id}</a>
          </div>
          <div className="divForm">
            Titulo:
            <input type="titulo" name="titulo" placeholder="titulo" onChange={handleChange}/>
          </div>
          <div className="divForm">
            Descripcion:
            <input type="descripcion" name="descripcion" placeholder="descripcion" onChange={handleChange}/>
          </div>
          <div className="divForm">
            Añada un archivo:
            <input type="file" className="input" id="inputFile"/>
          </div>
          <div className="divForm">
            Seleccione el tipo de suceso:
            <select name="tipo" id="tipo" onChange={handleChange} value={noticia.tipo}>
              <option value="robo" selected="selected">Robo</option>
              <option value="asalto">Asalto</option>
            </select>
          </div>
          <button type="submit">Subir</button>
          <h3>Subido {progress} %</h3>          
      </form>

  </div>
  );
}
