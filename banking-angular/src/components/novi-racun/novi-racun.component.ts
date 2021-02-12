import {Component, Inject, OnInit} from '@angular/core';
import {Stranka} from '../../models/stranka';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NovaStrankaComponent} from '../nova-stranka/nova-stranka.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SifraNamjene} from '../../models/sifraNamjene';
import {SifraComponent} from '../sifra/sifra.component';
import {Racun} from '../../models/racun';
import {RacunStore} from '../../stores/racun.store';
import {FindStrankaComponent} from '../find-stranka/find-stranka.component';

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

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<NoviRacunComponent>, private racunStore: RacunStore, @Inject( MAT_DIALOG_DATA ) public data?: string) {
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
      width: '300px',
      data: 'racun'
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

  findPrimatelj(): void {
    let d = '';
    if (this.data === 'ingoing')
    {
      d = 'primatelj';
    }
    if (this.data === 'outgoing')
    {
      d = 'uplatitelj';
    }
    const dialog = this.dialog.open(FindStrankaComponent, {
      width: '1200px',
      height: '700px',
      data: d
    });
    dialog.afterClosed().subscribe(res => {
      if (res)
      {

          this.primatelj = res;


      }
    });
  }

  findUplatitelj(): void {
    let d = '';
    if (this.data === 'outgoing')
    {
      d = 'primatelj';
    }
    if (this.data === 'ingoing')
    {
      d = 'uplatitelj';
    }
    const dialog = this.dialog.open(FindStrankaComponent, {
      width: '1200px',
      height: '700px',
      data: d
    });
    dialog.afterClosed().subscribe(res => {
      if (res)
      {

          this.uplatitelj = res;

      }
    });
  }

  spremi(): void {
    const izn = +this.racunGroup.get('iznos').value;
    let iznos = (izn * 100).toFixed(0);
    iznos = this.nule.substr(0, this.nule.length - iznos.length) + iznos;
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

    if(this.data === 'ingoing')
    {
      this.racunStore.saveIngoing(racun).subscribe(() => {
        this.dialogRef.close();
      });
    }
    if(this.data === 'outgoing')
    {
      this.racunStore.saveOutgoing(racun).subscribe(() => {
        this.dialogRef.close();
      });
    }

  }
}
