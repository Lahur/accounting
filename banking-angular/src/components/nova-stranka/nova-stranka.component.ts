import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Grad} from '../../models/grad';
import {Adresa} from '../../models/adresa';
import {Stranka} from '../../models/stranka';

@Component({
  selector: 'app-nova-stranka',
  templateUrl: './nova-stranka.component.html',
  styleUrls: ['./nova-stranka.component.scss']
})
export class NovaStrankaComponent implements OnInit {
  strankaGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<NovaStrankaComponent>) {
    this.strankaGroup = new FormGroup({
      naziv: new FormControl(null, [Validators.required]),
      iban: new FormControl(null, [Validators.required]),
      adresa: new FormControl(null, [Validators.required]),
      grad: new FormControl(null, [Validators.required]),
      post: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  spremi(): void {
    const grad = new Grad();
    grad.naziv = this.strankaGroup.get('grad').value;
    grad.post = this.strankaGroup.get('post').value;
    const adresa = new Adresa();
    adresa.adresa = this.strankaGroup.get('adresa').value;
    adresa.grad = grad;
    const stranka = new Stranka();
    stranka.naziv = this.strankaGroup.get('naziv').value;
    stranka.iban = this.strankaGroup.get('iban').value;
    stranka.adresa = adresa;

    this.dialogRef.close(stranka);
  }
}
