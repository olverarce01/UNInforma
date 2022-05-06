import styles from "./Alert.module.css";


export function Alert({message}){
    return <div>
        <span className={styles.alert}>{message}</span>
    </div>;
}