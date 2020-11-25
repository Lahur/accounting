import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Adresa} from '../models/adresa';
import {AdresaService} from '../services/adresa.service';

@Injectable({
  providedIn: 'root'
})
export class AdresaStore {

  private adresaSubject: BehaviorSubject<Adresa[]> = new BehaviorSubject<Adresa[]>([]);
  public readonly adresa$: Observable<Adresa[]> = this.adresaSubject.asObservable();

  constructor(private adresaService: AdresaService) {
  }

  getSubjectData(): Adresa[] {
    let adresa = [];
    this.adresa$.subscribe(res => {
      adresa = res;
    });
    return adresa;
  }
}
