export const environment = {
    appName: "Plan your Day",
    backendUrl: "https://rehastroke.inso-w.at",
    logging: {
        ajaxAppender: {
            threshold: "ERROR",
            url: "https://rehastroke.inso-w.at/logging/"
        },
        logLevels: [
            {
                logLevel: "ERROR",
                loggerName: "root"
            }
        ]
    },
    passwordLength: 6,
    production: true,
    tokenLength: 8
};
