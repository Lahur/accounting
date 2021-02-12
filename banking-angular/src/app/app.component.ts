import { Component } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  opened = false;

  pages = [
    {icon: 'request_page', name: 'Računi', route: 'racuni'},
    {icon: 'insert_drive_file', name: 'Moji računi', route: 'moji-racuni'},
    {icon: 'find_in_page', name: 'Stranke', route: 'stranke'},
    {icon: 'contact_page', name: 'Moje stranke', route: 'moje-stranke'},
  ];
  isLogin = false;

  constructor(private router: Router, private oauthService: OAuthService) {
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
    this.oauthService.logOut();
  }
}
