import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Observable } from "rxjs";

export class BaseUrlInterceptor implements HttpInterceptor {
    constructor(
        @Inject("BACKEND_URL") private baseUrl: string) {
    }

    /**
     * Intercepts the request and adds the backend-url to requested url.
     *
     * @param request request to intercept
     * @param next http-response
     */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url !== "Changelog.md") {
            const apiReq = request.clone({url: `${this.baseUrl}/${request.url}`});
            return next.handle(apiReq);
        }

        return next.handle(request);
    }
}
