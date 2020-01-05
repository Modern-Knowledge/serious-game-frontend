export const environment = {
    appName: "Plan your Day",
    backendUrl: "http://rehastroke01.research.inso-w.com:8080",
    logging: {
        ajaxAppender: {
            threshold: "ERROR",
            url: "http://rehastroke01.research.inso-w.com:8080/logging/"
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
