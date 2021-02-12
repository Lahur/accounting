import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {environment} from '../environments/environment';
import {IonicSelectableModule} from 'ionic-selectable';
import {HttpClientModule} from '@angular/common/http';
import {IonicKeycloakAuthModule} from '@cmotion/ionic-keycloak-auth';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    IonicSelectableModule,
    HttpClientModule,
    IonicKeycloakAuthModule.forRoot({
      jwtModuleOptions: {

        getToken: () => JSON.parse(localStorage.getItem('token')),
        setToken: (value) => localStorage.setItem('token', value ? JSON.stringify(value) : null),


        whitelistedDomains: ['192.168.1.6:8080'],

        blacklistedRoutes: []
      },
      deepLinksConfig: {
        deepLinkingScheme: 'myapp'
      },
      keycloakConfig: {
        jsonConfig: () => environment.keycloak
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
      BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
