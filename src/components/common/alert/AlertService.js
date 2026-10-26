let alertHandler = null;

export const AlertService = {
    setHandler(handler) {
        alertHandler = handler;
    },

    show({
        message,
        type = "error",
        backgroundColor,
        icon,
        duration = 3000,
    }) {
        if (alertHandler) {
            alertHandler({
                message,
                type,
                backgroundColor,
                icon,
                duration,
            });
        }
    },
};