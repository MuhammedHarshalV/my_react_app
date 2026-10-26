import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    useRef,
} from "react";

import styles from "./Alert.module.css";
import { AlertService } from "./AlertService";
const AlertContext = createContext(null);

export function AlertProvider({ children }) {
    const [alert, setAlert] = useState(null);
    const timerRef = useRef(null);

    const showAlert = useCallback(
        ({
            message,
            type = "error",
            backgroundColor,
            icon,
            duration = 3000,
        }) => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            setAlert({
                message,
                type,
                backgroundColor,
                icon,
            });

            if (duration > 0) {
                timerRef.current = setTimeout(() => {
                    setAlert(null);
                }, duration);
            }
        },
        []
    );

    const hideAlert = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        setAlert(null);
    }, []);

    // Connect global AlertService to React AlertProvider
    useEffect(() => {
        AlertService.setHandler(showAlert);

        return () => {
            AlertService.setHandler(null);
        };
    }, [showAlert]);

    return (
        <AlertContext.Provider
            value={{
                showAlert,
                hideAlert,
            }}
        >
            {children}

            {alert && (
                <div
                    className={styles.alert}
                    style={
                        alert.backgroundColor
                            ? {
                                backgroundColor:
                                    alert.backgroundColor,
                            }
                            : undefined
                    }
                >
                    <div
                        className={`${styles.icon} ${styles[alert.type] ?? ""
                            }`}
                    >
                        {alert.icon ?? getDefaultIcon(alert.type)}
                    </div>

                    <span className={styles.message}>
                        {alert.message}
                    </span>

                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={hideAlert}
                    >
                        ×
                    </button>
                </div>
            )}
        </AlertContext.Provider>
    );
}

function getDefaultIcon(type) {
    switch (type) {
        case "success":
            return "✓";

        case "warning":
            return "!";

        case "info":
            return "i";

        case "error":
        default:
            return "!";
    }
}

export function useAlert() {
    const context = useContext(AlertContext);

    if (!context) {
        throw new Error(
            "useAlert must be used inside AlertProvider"
        );
    }

    return context;
}