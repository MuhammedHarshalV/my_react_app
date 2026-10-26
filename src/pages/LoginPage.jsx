import LoginCard from "../components/auth/login/LoginCard";
import styles from "../components/auth/login/LoginCard.module.css";

export default function LoginPage() {
    return (
        <main className={styles.loginPage}>
            <LoginCard />
        </main>
    );
}