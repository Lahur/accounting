import { Component, OnInit } from '@angular/core';
import {combineLatest, Observable, of} from 'rxjs';
import {SifraNamjene} from '../../models/sifraNamjene';
import {SifraNamjeneStore} from '../../stores/sifra-namjene.store';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-sifra',
  templateUrl: './sifra.component.html',
  styleUrls: ['./sifra.component.scss']
})
export class SifraComponent implements OnInit {

  sifre: Observable<SifraNamjene[]> = of([]);
  displayedColumns = ['rbr', 'klasifikacija', 'sifra', 'naziv', 'definicija'];
  filter: FormControl = new FormControl('');

  constructor(private sifraNamjeneStore: SifraNamjeneStore, private dialogRef: MatDialogRef<SifraComponent>) {
    this.sifre = combineLatest(
      this.sifraNamjeneStore.sifraNamjene$,
      this.filter.valueChanges.pipe(startWith(''))
    ).pipe(
      map(([sif, filterString]) => sif.filter(f => f.sifra.toLowerCase().includes(filterString.toLowerCase()) || f.naziv.toLowerCase().includes(filterString.toLowerCase())))
    );
    this.sifraNamjeneStore.getAll();

  }

  ngOnInit(): void {
  }

  getSifra(sifra: SifraNamjene): void {
    this.dialogRef.close(sifra);
  }
}
