import { Component, OnInit } from '@angular/core';
import {RacunStore} from '../../stores/racun.store';
import {Observable, of} from 'rxjs';
import {Racun} from '../../models/racun';
import {MatDialog} from '@angular/material/dialog';
import {NoviRacunComponent} from '../novi-racun/novi-racun.component';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {DetaljiRacunaComponent} from '../detalji-racuna/detalji-racuna.component';

@Component({
  selector: 'app-racuni',
  templateUrl: './racuni.component.html',
  styleUrls: ['./racuni.component.scss']
})
export class RacuniComponent implements OnInit {

  racuni: Observable<Racun[]> = of([]);
  displayedColumns: string[] = ['select', 'primatelj', 'uplatitelj', 'sifra', 'svota', 'brisanje'];
  selection = new SelectionModel<Racun>(true, []);
  numRows = 0;

  constructor(private racunStore: RacunStore, private dialog: MatDialog) {
    this.racuni = this.racunStore.racun$;
    this.racuni.subscribe(res => {
      this.numRows = res.length;
    });
    this.racunStore.getIngoing();
  }

  ngOnInit(): void {
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.numRows;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.racuni.subscribe(res => {
        res.forEach(row => this.selection.select(row));
      });
  }


  new(): void {
    this.dialog.open(NoviRacunComponent, {
      width: '800px',
      data: 'ingoing'
    });
  }

  getXml(): void {
    const ids = this.selection.selected.map(m => m.id);
    this.racunStore.getXml(ids);
  }

  delete(id: string): void {
    this.racunStore.delete(id);
  }

  refresh(): void {
    this.racunStore.getIngoing();
  }

  detalji(r: Racun): void {
    this.dialog.open(DetaljiRacunaComponent, {
      width: '700px',
      data: r
    });
  }
}
