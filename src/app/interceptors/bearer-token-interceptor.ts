import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../providers/auth.service";

export class BearerTokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                  "Authorization": `Bearer ${token}`,
                  "x-access-token": token
                }
              });
        }
        return next.handle(request);
    }
}
