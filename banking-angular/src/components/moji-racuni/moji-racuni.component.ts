import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Racun} from '../../models/racun';
import {RacunStore} from '../../stores/racun.store';
import {MatDialog} from '@angular/material/dialog';
import {NoviRacunComponent} from '../novi-racun/novi-racun.component';
import {DetaljiRacunaComponent} from '../detalji-racuna/detalji-racuna.component';

@Component({
  selector: 'app-moji-racuni',
  templateUrl: './moji-racuni.component.html',
  styleUrls: ['./moji-racuni.component.scss']
})
export class MojiRacuniComponent implements OnInit {

  racuni: Observable<Racun[]> = of([]);
  displayedColumns: string[] = ['primatelj', 'uplatitelj', 'sifra', 'svota', 'pdf', 'brisanje'];

  constructor(private racunStore: RacunStore, private dialog: MatDialog) {
    this.racuni = this.racunStore.racun$;
    this.racunStore.getOutgoing();
  }

  ngOnInit(): void {
  }

  new(): void {
    this.dialog.open(NoviRacunComponent, {
      width: '800px',
      data: 'outgoing'
    });
  }

  createPdf(id: string): void {
    this.racunStore.getPdf(id);
  }

  delete(id: string): void {
    this.racunStore.delete(id);
  }

  detalji(r: Racun): void {
    this.dialog.open(DetaljiRacunaComponent, {
      width: '700px',
      data: r
    });
  }
}
