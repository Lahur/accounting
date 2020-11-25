import { Component, OnInit } from '@angular/core';
import {Stranka} from '../../models/stranka';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NovaStrankaComponent} from '../nova-stranka/nova-stranka.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SifraNamjene} from '../../models/sifraNamjene';
import {SifraComponent} from '../sifra/sifra.component';
import {Racun} from '../../models/racun';
import {RacunStore} from '../../stores/racun.store';

@Component({
  selector: 'app-novi-racun',
  templateUrl: './novi-racun.component.html',
  styleUrls: ['./novi-racun.component.scss']
})
export class NoviRacunComponent implements OnInit {
  nule = '000000000000000';
  uplatitelj: Stranka = null;
  primatelj: Stranka = null;
  sifra: SifraNamjene = null;
  racunGroup: FormGroup;

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<NoviRacunComponent>, private racunStore: RacunStore) {
    this.racunGroup = new FormGroup({
      valuta: new FormControl(null, [Validators.required]),
      iznos: new FormControl(null, [Validators.required]),
      opis: new FormControl(null, [Validators.required]),
      poziv: new FormControl(null, [Validators.required]),
      model: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  add(vrsta: string): void {
    const dialog = this.dialog.open(NovaStrankaComponent, {
      width: '300px'
    });
    dialog.afterClosed().subscribe(res => {
      if (res)
      {
        if (vrsta === 'u')
        {
          this.uplatitelj = res;
        }
        if (vrsta === 'p')
        {
          this.primatelj = res;
        }
      }
    });
  }

  findSifra(): void {
    const dialog = this.dialog.open(SifraComponent, {
      width: '1200px',
      height: '700px'
    });
    dialog.afterClosed().subscribe(res => {
      if (res)
      {
        this.sifra = res;
      }
    });
  }

  spremi(): void {
    const izn = +this.racunGroup.get('iznos').value;
    let iznos = izn.toFixed(0);
    iznos = this.nule.substr(0, iznos.length) + iznos;
    const racun = new Racun();
    racun.uplatnica = 'HRVHUB30';
    racun.valuta = this.racunGroup.get('valuta').value;
    racun.iznos = iznos;
    racun.uplatitelj = this.uplatitelj;
    racun.primatelj = this.primatelj;
    racun.iban = this.primatelj.iban;
    racun.model = this.racunGroup.get('model').value;
    racun.pozivNaBroj = this.racunGroup.get('poziv').value;
    racun.opis = this.racunGroup.get('opis').value;
    racun.sifraNamjene = this.sifra;

    this.racunStore.save(racun).subscribe(() => {
      this.dialogRef.close();
    })

  }
}
