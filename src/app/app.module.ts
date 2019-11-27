import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Router, RouteReuseStrategy } from "@angular/router";

import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicStorageModule } from "@ionic/storage";
import { LoggingService, LoggingServiceModule } from "ionic-logging-service";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { BaseUrlInterceptor } from "./interceptors/base-url-interceptor";
import { BearerTokenInterceptor } from "./interceptors/bearer-token-interceptor";
import { AuthService } from "./providers/auth.service";

import { DragulaModule } from "ng2-dragula";
import { ErrorInterceptor } from "./interceptors/error-interceptor";

export function configureLogging(loggingService: LoggingService): () => void {
  return () => loggingService.configure(environment.logging);
}

@NgModule({
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
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerTokenInterceptor,
      multi: true,
      deps: [AuthService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
      deps: [AuthService, Router, LoggingService]
    },
    {
      deps: [LoggingService],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: configureLogging
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
