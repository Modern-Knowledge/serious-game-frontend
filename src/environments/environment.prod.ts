export const environment = {
    appName: "Plan your Day",
    backendUrl: "https://rehastroke.inso-w.at",
    lastBuildDate: "2020-02-06",
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
    tokenLength: 8,
    version: "1.1.0",
};
