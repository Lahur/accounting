import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegisterComponent} from '../register/register.component';
import {KorisnikService} from '../../services/korisnik.service';
import {KeycloakService} from 'keycloak-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog, private keycloakService: KeycloakService, private router: Router) {}

  ngOnInit(): void {
  }

  openRegister(): void {
    let dialog = this.dialog.open(RegisterComponent, {
      width: '500px'
    });
  }

  login(): void {
    console.log('a');
    this.keycloakService.login().then(() => {
    });
  }
}
