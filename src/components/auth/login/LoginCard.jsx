import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginCard.module.css";
import { adminLoginApi } from "../../../services/api/loginApi";

export default function LoginCard() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        username: false,
        password: false,
    });


    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (value.trim() !== "") {
            setErrors((previous) => ({
                ...previous,
                [name]: false,
            }));
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const newErrors = {
            username: formData.username.trim() === "",
            password: formData.password.trim() === "",
        };

        setErrors(newErrors);

        // Don't call API if fields are empty
        if (newErrors.username || newErrors.password) {
            return;
        }

        // Prevent multiple API calls
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await adminLoginApi(
                formData.username.trim(),
                formData.password.trim()
            );



            if (response?.success === true) {
                navigate("/dashboard", {
                    replace: true,
                });
            }

        } catch (error) {
            console.log(error);
        }
        finally {
            // Always stop loader
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginCard}>
            <div className={styles.header}>
                <div>
                    <h1>Welcome</h1>
                    <p>
                        Accurate results, better care. Sign in to continue
                    </p>
                </div>

                <div className={styles.logo}>
                    LOGO
                </div>
            </div>

            <form onSubmit={handleLogin}>
                <div className={styles.field}>
                    <label>User name</label>

                    <input
                        type="text"
                        name="username"
                        placeholder="User name"
                        value={formData.username}
                        onChange={handleChange}
                        className={
                            errors.username ? styles.inputError : ""
                        }
                    />
                </div>

                <div className={styles.field}>
                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        className={
                            errors.password ? styles.inputError : ""
                        }
                    />
                </div>

                <button
                    className={styles.loginButton}
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className={styles.loader}></span>
                    ) : (
                        "Login"
                    )}
                </button>
            </form>

            <p className={styles.footer}>
                Developed by Icon Infoware Technologies
            </p>
        </div>
    );
}