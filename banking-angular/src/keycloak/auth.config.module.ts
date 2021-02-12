import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, AuthConfig } from 'angular-oauth2-oidc';

import { AuthConfigService } from './authconfig.service';
import { authConfig } from './auth.config';
import {environment} from '../environments/environment';

export function init_app(authConfigService: AuthConfigService): any {
  return () => authConfigService.initAuth();
}

@NgModule({
  imports: [
    HttpClientModule, OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.url],
        sendAccessToken: true
      }
    }),
  ],
  providers: [
    AuthConfigService,
    { provide: AuthConfig, useValue: authConfig },
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [ AuthConfigService ],
      multi: true
    }
  ]
})
export class AuthConfigModule { }
