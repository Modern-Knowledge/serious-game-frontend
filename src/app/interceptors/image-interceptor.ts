import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { LoggingService } from "ionic-logging-service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { ImageService } from "../providers/image.service";

@Injectable()
export class ImageInterceptor implements HttpInterceptor {
    constructor(
        private imageService: ImageService,
        private router: Router,
        private logging: LoggingService,
        private sanitizer: DomSanitizer
    ) {}

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (
                    event instanceof HttpResponse &&
                    event.url === `${environment.backendUrl}/ingredients`
                ) {
                    event.body._data.ingredients.map((ingredient) => {
                        if (ingredient._imageId) {
                            console.log(ingredient);
                            ingredient.image =
                                "http://localhost:3000/images/" +
                                ingredient._imageId;
                        }
                    });
                }
                return event;
            })
        );
    }
}
