import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Observable } from "rxjs";

export class BaseUrlInterceptor implements HttpInterceptor {
    constructor(
        @Inject("BACKEND_URL") private baseUrl: string) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = request.clone({ url: `${this.baseUrl}/${request.url}` });
        return next.handle(apiReq);
    }
}
