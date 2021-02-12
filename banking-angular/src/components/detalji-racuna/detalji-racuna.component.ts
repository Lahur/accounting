import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Racun} from '../../models/racun';

@Component({
  selector: 'app-detalji-racuna',
  templateUrl: './detalji-racuna.component.html',
  styleUrls: ['./detalji-racuna.component.scss']
})
export class DetaljiRacunaComponent implements OnInit {

  constructor(@Inject( MAT_DIALOG_DATA ) public data?: Racun) { }

  ngOnInit(): void {
  }

}
