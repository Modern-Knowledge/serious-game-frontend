import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../providers/auth.service";

export class BearerTokenInterceptor implements HttpInterceptor {

    /**
     * @param authService authentication service
     */
    constructor(private authService: AuthService) {
    }

    /**
     * Intercepts the request and adds the authentication token to the request.
     *
     * @param request http-request to intercept
     * @param next http-response
     */
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
