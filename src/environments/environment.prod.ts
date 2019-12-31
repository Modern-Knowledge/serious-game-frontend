export const environment = {
    backendUrl: "http://localhost:3000",
    logging: {
        ajaxAppender: {
            threshold: "ERROR",
            url: "http://localhost:3000/logging/"
        },
        logLevels: [
            {
                logLevel: "ERROR",
                loggerName: "root"
            }
        ]
    },
    production: true,
    passwordLength: 6,
    tokenLength: 8
};
