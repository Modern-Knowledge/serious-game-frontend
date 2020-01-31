// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    appName: "Plan your Day",
    backendUrl: "http://localhost:3000",
    logging: {
        ajaxAppender: {
            threshold: "DEBUG",
            url: "http://localhost:3000/logging/"
        },
        logLevels: [
            {
                logLevel: "DEBUG",
                loggerName: "root"
            }
        ]
    },
    passwordLength: 6,
    production: false,
    tokenLength: 8,
    version: "1.0.0"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
