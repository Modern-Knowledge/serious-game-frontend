import { APP_INITIALIZER, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { LoggingService, LoggingServiceModule } from 'ionic-logging-service';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseUrlInterceptor } from './interceptors/base-url-interceptor';
import { AuthService } from './providers/auth.service';
import { BearerTokenInterceptor } from './interceptors/bearer-token-interceptor';


export function configureLogging(loggingService: LoggingService): () => void {
  return () => loggingService.configure(environment.logging);
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    LoggingServiceModule,
    ReactiveFormsModule
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
