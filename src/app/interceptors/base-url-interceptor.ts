import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';

export class BaseUrlInterceptor implements HttpInterceptor {
    constructor(
        @Inject('BACKEND_URL') private baseUrl: string) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = request.clone({ url: `${this.baseUrl}/${request.url}` });
        return next.handle(apiReq);
    }
}