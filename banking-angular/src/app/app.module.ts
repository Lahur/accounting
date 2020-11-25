import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { RacuniComponent } from '../components/racuni/racuni.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {KorisnikService} from '../services/korisnik.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService} from 'keycloak-angular';
import { HomeComponent } from '../components/home/home.component';
import {environment} from '../environments/environment';
import {GradService} from '../services/grad.service';
import {AdresaService} from '../services/adresa.service';
import {SifraNamjeneService} from '../services/sifra-namjene.service';
import {StrankaService} from '../services/stranka.service';
import {RacunService} from '../services/racun.service';
import {GradoviStore} from '../stores/gradovi.store';
import {AdresaStore} from '../stores/adresa.store';
import {SifraNamjeneStore} from '../stores/sifra-namjene.store';
import {StrankaStore} from '../stores/stranka.store';
import {RacunStore} from '../stores/racun.store';
import { SvotaPipe } from '../pipes/svota.pipe';
import { NoviRacunComponent } from '../components/novi-racun/novi-racun.component';
import { NovaStrankaComponent } from '../components/nova-stranka/nova-stranka.component';
import { SifraComponent } from '../components/sifra/sifra.component';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: environment.keycloak,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false,
            redirectUri: 'http://localhost:4200'
          },
          enableBearerInterceptor: true,
          bearerPrefix: 'Bearer',
          bearerExcludedUrls: [
            'main.js',
          ]
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    RacuniComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SvotaPipe,
    NoviRacunComponent,
    NovaStrankaComponent,
    SifraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService],
    },
    KorisnikService,
    GradService,
    AdresaService,
    SifraNamjeneService,
    StrankaService,
    RacunService,
    GradoviStore,
    AdresaStore,
    SifraNamjeneStore,
    StrankaStore,
    RacunStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
