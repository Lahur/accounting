// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const keycloakConfig = {
  realm: 'accounting',
  'auth-server-url': 'http://192.168.1.6:8180/auth',
  'ssl-required': 'false',
  resource: 'ionic-app',
  'verify-token-audience': true,
  'use-resource-role-mappings': true,
  'confidential-port': 0
};

export const environment = {
  production: false,
  keycloak: keycloakConfig,
  url: 'http://192.168.1.6:8080/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.