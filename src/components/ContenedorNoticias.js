import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../firebase';
import { useAuth } from '../context/authContext';
import styles from "./ContenedorNoticias.module.css";
async function consulta(id,noticias,setNoticias){



  const q = query(collection(db, "Posters"), where("poligono", "==", id));

  const querySnapshot = await getDocs(q);
  var docs=[];
  querySnapshot.forEach((doc) => {
    docs.push(doc);
  });
  setNoticias(docs);
}


export default function ContenedorNoticias() {
  const [noticias,setNoticias]=useState([]);
  let {id}=useParams();
  var url="/noticias/";
  var slash="/";

  const {loading} = useAuth();

useEffect(() => {
  consulta(id,noticias,setNoticias);

});


if(loading) return <div className="containerLoading"><img src="../loading.gif" width="600px"/></div>


  return (
    <div>
      <header className={styles.headerNoticias}>
        Noticias {id}
      </header>
      {
      noticias.map((noticia) => (
        <a href={url+id+slash+noticia.id} key={noticia.id}>
          <div className={styles.noticia} key={noticia.id} id={noticia.id}>
          <div className={styles.noticia_titulo}>{noticia.data().titulo}</div>
          <div className={styles.noticia_contenido}>{noticia.data().descripcion}</div>
          <div className={styles.noticia_tipo}>{noticia.data().tipo}</div>
        </div>
        </a>
      ))



      }

    </div>
  );
}
