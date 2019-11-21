import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoggingService } from "ionic-logging-service";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
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
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.authService.logout();
                    this.router.navigateByUrl("/login");
                    this.logging.getRootLogger().info("error-interceptor", {
                        message: `${error.message} Redirecting user to login page.`
                    });
                    const message = new ToastWrapper(
                        error.error._messages[0].message,
                        ToastPosition.BOTTOM,
                        error.error._messages[0]._severity
                    );
                    message.alert();
                }
                return throwError(error);
            })
        );
    }
}
