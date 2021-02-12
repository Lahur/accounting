import { Component, OnInit } from '@angular/core';
import {KeycloakAuthService} from '@cmotion/ionic-keycloak-auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(public keycloakAuthService: KeycloakAuthService, private router: Router) {

  }

  ngOnInit() {
  }

  login() {
    this.keycloakAuthService.login(true, '/').then(() => {
      this.router.navigate(['home']);
    });
  }
}
