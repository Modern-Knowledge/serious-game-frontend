import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule, Sanitizer } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { Router, RouteReuseStrategy } from "@angular/router";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage";
import { LoggingService, LoggingServiceModule } from "ionic-logging-service";
import { DragulaModule } from "ng2-dragula";

import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { BaseUrlInterceptor } from "./interceptors/base-url-interceptor";
import { BearerTokenInterceptor } from "./interceptors/bearer-token-interceptor";
import { ErrorInterceptor } from "./interceptors/error-interceptor";
import { ImageInterceptor } from "./interceptors/image-interceptor";
import { AuthService } from "./providers/auth.service";
import { ImageService } from "./providers/image.service";

export function configureLogging(loggingService: LoggingService): () => void {
    return () => loggingService.configure(environment.logging);
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, NavbarComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        LoggingServiceModule,
        ReactiveFormsModule,
        DragulaModule.forRoot()
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: "BACKEND_URL", useValue: environment.backendUrl },
        {
            multi: true,
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor
        },
        {
            deps: [AuthService],
            multi: true,
            provide: HTTP_INTERCEPTORS,
            useClass: BearerTokenInterceptor
        },
        {
            deps: [AuthService, Router, LoggingService],
            multi: true,
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor
        },
        {
            deps: [ImageService, Router, LoggingService, Sanitizer],
            multi: true,
            provide: HTTP_INTERCEPTORS,
            useClass: ImageInterceptor
        },
        {
            deps: [LoggingService],
            multi: true,
            provide: APP_INITIALIZER,
            useFactory: configureLogging
        },
        AuthService
    ]
})
export class AppModule {}
