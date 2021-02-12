import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {combineLatest, Observable, of} from 'rxjs';
import {Stranka} from '../../models/stranka';
import {StrankaStore} from '../../stores/stranka.store';
import {map, startWith} from 'rxjs/operators';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-find-stranka',
  templateUrl: './find-stranka.component.html',
  styleUrls: ['./find-stranka.component.scss']
})
export class FindStrankaComponent implements OnInit {

  filter: FormControl = new FormControl('');
  stranke: Observable<Stranka[]> = of([]);
  displayedColumns = ['naziv', 'iban', 'adresa', 'grad'];

  constructor(private strankaStore: StrankaStore, private dialogRef: MatDialogRef<FindStrankaComponent>, @Inject( MAT_DIALOG_DATA ) public data?: string) {
    this.stranke = combineLatest(
      this.strankaStore.stranka$,
      this.filter.valueChanges.pipe(startWith(''))
    ).pipe(
      map(([sif, filterString]) => sif.filter(f => f.naziv.toLowerCase().includes(filterString.toLowerCase()) || f.iban.toLowerCase().includes(filterString.toLowerCase())))
    );
    if (this.data.includes('primatelj'))
    {
      this.strankaStore.getOther()
    }
    if (this.data.includes('uplatitelj'))
    {
      this.strankaStore.getForKorisnik();
    }
  }

  ngOnInit(): void {
  }

  getPrimatelj(primatelj: Stranka): void {
    this.dialogRef.close(primatelj);
  }
}
