import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {combineLatest, Observable, of} from 'rxjs';
import {Stranka} from '../../models/stranka';
import {StrankaStore} from '../../stores/stranka.store';
import {MatDialog} from '@angular/material/dialog';
import {map, startWith} from 'rxjs/operators';
import {NovaStrankaComponent} from '../nova-stranka/nova-stranka.component';

@Component({
  selector: 'app-stranke',
  templateUrl: './stranke.component.html',
  styleUrls: ['./stranke.component.scss']
})
export class StrankeComponent implements OnInit {

  filter: FormControl = new FormControl('');
  stranke: Observable<Stranka[]> = of([]);
  displayedColumns = ['naziv', 'iban', 'adresa', 'grad'];

  constructor(private strankaStore: StrankaStore, private dialog: MatDialog) {
    this.stranke = combineLatest(
      this.strankaStore.stranka$,
      this.filter.valueChanges.pipe(startWith(''))
    ).pipe(
      map(([sif, filterString]) => sif.filter(f => f.naziv.toLowerCase().includes(filterString.toLowerCase()) || f.iban.toLowerCase().includes(filterString.toLowerCase())))
    );
    this.strankaStore.getOther();
  }

  ngOnInit(): void {
  }

  new(): void {
    this.dialog.open(NovaStrankaComponent, {
      width: '300px',
      data: 'stranka'
    });
  }

}
