import { Component } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  opened = false;

  pages = [
    {icon: 'request_page', name: 'Računi', route: 'racuni'}
  ];
  isLogin = false;

  constructor(private router: Router, private keycloakService: KeycloakService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url.includes('login')) {
          this.isLogin = true;
        }
      }
    });
  }

  openDrawer(): void {
    this.opened = !this.opened;
  }

  toPage(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.keycloakService.logout(window.location.origin + '/login');
  }
}
