import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {LoggingService} from "ionic-logging-service";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {HttpResponseMessageSeverity} from "src/lib/utils/http/HttpResponse";

import {HTTPStatusCode} from "../../lib/utils/httpStatusCode";
import {AuthService} from "../providers/auth.service";
import {ToastPosition, ToastWrapper} from "../util/ToastWrapper";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    /**
     * @param authService authentication service
     * @param router application router
     * @param logging logging service
     */
    constructor(
        private authService: AuthService,
        private router: Router,
        private logging: LoggingService
    ) {
    }

    /**
     * Intercepts the http-response to display status messages.
     * All error-messages are displayed in a toast. Successful messages are displayed only if the are set visible in
     * the backend.
     * Each error-status code (400, 401, ...) is handled different.
     *
     * @param request request to intercept
     * @param next response to intercept
     */
    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((evt) => {
                if (
                    evt instanceof HttpResponse &&
                    evt.body &&
                    evt.body._status === "success"
                ) {
                    const messages = evt.body._messages;
                    if (!evt.url.includes("changelog")) {
                        this.logging.getRootLogger()
                            .info(
                                `${evt.status} ${evt.statusText}`,
                                evt.url,
                                this.authService.getUserIdFromToken(),
                                evt.body
                            );
                    }

                    for (const item of messages) {
                        if (item._visible === true) {
                            const message = new ToastWrapper(
                                item.message,
                                ToastPosition.TOP,
                                item._severity,
                                "Erfolg"
                            );
                            message.alert();
                        }
                    }
                }
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === HTTPStatusCode.UNAUTHORIZED) {
                    this.handleUnauthorized(error);
                } else {
                    this.handleError(error);
                }

                if (!error.error._messages) {
                    const message = new ToastWrapper(
                        "Es besteht keine Internetverbindung, bitte versuchen Sie es in ein paar Minuten erneut.",
                        ToastPosition.TOP,
                        HttpResponseMessageSeverity.DANGER
                    );
                    message.alert();
                } else {
                    for (const item of error.error._messages) {
                        const message = new ToastWrapper(
                            item.message,
                            ToastPosition.TOP,
                            item._severity,
                            "Fehler"
                        );
                        message.alert();
                    }
                }

                return throwError(error);
            })
        );
    }

    /**
     * Handles the http unauthorized (401) status code.
     * @param error http-response error
     */
    private handleUnauthorized(error: HttpErrorResponse): void {
        this.authService.logout();
        this.router.navigateByUrl("/login");
        this.logging.getRootLogger()
            .error(
                `${error.status} ${error.statusText}`,
                error.message,
                this.authService.getUserIdFromToken(),
                error.error
            );
    }

    /**
     * Handles bad http-requests.
     *
     * @param error http-response error
     */
    private handleError(error: HttpErrorResponse): void {
        this.logging.getRootLogger()
            .error(
                `${error.status} ${error.statusText}`,
                error.message,
                this.authService.getUserIdFromToken(),
                error.error
            );
    }
}
