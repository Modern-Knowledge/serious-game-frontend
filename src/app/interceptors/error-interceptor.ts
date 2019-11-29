import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoggingService } from "ionic-logging-service";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { HTTPStatusCode } from "../../lib/utils/httpStatusCode";
import { AuthService } from "../providers/auth.service";
import { ToastPosition, ToastWrapper } from "../util/ToastWrapper";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router,
        private logging: LoggingService
    ) {}

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

                    for (const item of messages) {
                        const message = new ToastWrapper(
                            item.message,
                            ToastPosition.TOP,
                            item._severity,
                            "Erfolg"
                        );
                        //message.alert();

                        this.logging
                            .getRootLogger()
                            .info(this.handleUnauthorized.name, {
                                message: `${item.message}`
                            });
                    }
                }
            }),
            catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case HTTPStatusCode.UNAUTHORIZED:
                        this.handleUnauthorized(error);
                        break;
                    case HTTPStatusCode.BAD_REQUEST:
                        this.handleBadRequest(error);
                        break;
                    case HTTPStatusCode.FORBIDDEN:
                        this.handleForbidden(error);
                        break;
                    case HTTPStatusCode.NOT_FOUND:
                        this.handleNotFound(error);
                        break;
                    case HTTPStatusCode.INTERNAL_SERVER_ERROR:
                        this.handleInternalServerError(error);
                        break;
                }

                for (const item of error.error._messages) {
                    const message = new ToastWrapper(
                        item.message,
                        ToastPosition.TOP,
                        item._severity
                    );
                    message.alert();
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
        this.logging.getRootLogger().info(this.handleUnauthorized.name, {
            message: `${error.message} Redirecting user to login page.`
        });
    }

    /**
     * Handles the http bad-request (400) status code.
     * @param error http-response error
     */
    private handleBadRequest(error: HttpErrorResponse): void {
        this.logging.getRootLogger().info(this.handleBadRequest.name, {
            message: `${error.message}`
        });
    }

    /**
     * Handles the http forbidden (403) status code.
     * @param error http-response error
     */
    private handleForbidden(error: HttpErrorResponse): void {
        this.logging.getRootLogger().info(this.handleForbidden.name, {
            message: `${error.message}`
        });
    }

    /**
     * Handles the http not-found (404) status code.
     * @param error http-response error
     */
    private handleNotFound(error: HttpErrorResponse): void {
        this.logging.getRootLogger().info(this.handleNotFound.name, {
            message: `${error.message}`
        });
    }

    /**
     * Handles the http internal-server-error (500) status code.
     * @param error http-response error
     */
    private handleInternalServerError(error: HttpErrorResponse): void {
        this.logging.getRootLogger().info(this.handleInternalServerError.name, {
            message: `${error.message}`
        });
    }
}
