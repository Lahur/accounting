import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {KorisnikRequest} from '../../models/korisnikRequest';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {KorisnikService} from '../../services/korisnik.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerGroup: FormGroup;

  constructor(private dialog: MatDialogRef<RegisterComponent>, private korisnikService: KorisnikService) {
    this.registerGroup = new FormGroup({
      ime: new FormControl(null, [Validators.required]),
      prezime: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      korisnicko: new FormControl(null, [Validators.required]),
      lozinka: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  register() {
    let korisnik = new KorisnikRequest();
    korisnik.ime = this.registerGroup.get('ime').value;
    korisnik.prezime = this.registerGroup.get('prezime').value;
    korisnik.email = this.registerGroup.get('email').value;
    korisnik.korisnicko = this.registerGroup.get('korisnicko').value;
    korisnik.lozinka = this.registerGroup.get('lozinka').value;
    this.korisnikService.register(korisnik).subscribe(() => {
      this.dialog.close();
    });
  }
}
