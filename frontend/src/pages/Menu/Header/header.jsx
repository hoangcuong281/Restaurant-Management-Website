import styles from "./header.module.css";

function Header(){
    return(
        <div className={styles.topTitle}>
            <p className={styles.menuTitle}>Thực đơn</p>
        </div>
    );
}

export default Header;