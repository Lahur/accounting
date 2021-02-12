import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegisterComponent} from '../register/register.component';
import {KorisnikService} from '../../services/korisnik.service';
import {Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog, private oauthService: OAuthService) {}

  ngOnInit(): void {
  }

  openRegister(): void {
    const dialog = this.dialog.open(RegisterComponent, {
      width: '500px'
    });
  }

  login(): void {
    this.oauthService.initImplicitFlow();
  }
}
