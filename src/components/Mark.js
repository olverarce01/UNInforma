import styles from "./Mark.module.css";
export function Mark({nombre,contenidoHtml}){
    return <div id={nombre} className={styles.mark}>
            <p className={styles.parrafo}>{contenidoHtml}</p>
            <div>
                <a href={"/noticias/"+nombre} className={styles.button}>Noticias</a>
                <a href={"/crearNoticia/"+nombre} className={styles.button}>Agregar</a>
            </div>
            </div>;
}