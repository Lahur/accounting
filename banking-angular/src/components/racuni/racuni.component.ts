import { Component, OnInit } from '@angular/core';
import {RacunStore} from '../../stores/racun.store';
import {Observable, of} from 'rxjs';
import {Racun} from '../../models/racun';
import {MatDialog} from '@angular/material/dialog';
import {NoviRacunComponent} from '../novi-racun/novi-racun.component';

@Component({
  selector: 'app-racuni',
  templateUrl: './racuni.component.html',
  styleUrls: ['./racuni.component.scss']
})
export class RacuniComponent implements OnInit {

  racuni: Observable<Racun[]> = of([]);
  displayedColumns: string[] = ['primatelj', 'uplatitelj', 'sifra', 'svota'];

  constructor(private racunStore: RacunStore, private dialog: MatDialog) {
    this.racuni = this.racunStore.racun$;
    this.racunStore.getAll();
  }

  ngOnInit(): void {
  }

  new(): void {
    this.dialog.open(NoviRacunComponent, {
      width: '800px',
    });
  }
}
