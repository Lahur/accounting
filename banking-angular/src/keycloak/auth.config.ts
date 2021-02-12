import {AuthConfig} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';

export const authConfig: AuthConfig = {
  issuer: environment.keycloak.url + '/realms/' + environment.keycloak.realm,
  redirectUri: environment.keycloak.redirectUri,
  postLogoutRedirectUri: environment.keycloak.redirectUri + '/login',
  clientId: environment.keycloak.clientId,
  responseType: environment.keycloak.responseType,
  scope: environment.keycloak.scope,
  requireHttps: environment.keycloak.requireHttps,
  showDebugInformation: environment.keycloak.showDebugInformation,
  disableAtHashCheck: environment.keycloak.disableAtHashCheck
};


