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
    passwordLength: 6,
    production: true,
    tokenLength: 8
};
