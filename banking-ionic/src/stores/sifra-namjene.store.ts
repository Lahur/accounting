import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SifraNamjene} from '../models/sifraNamjene';
import {SifraNamjeneService} from '../services/sifra-namjene.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SifraNamjeneStore {

  private sifraNamjeneSubject: BehaviorSubject<SifraNamjene[]> = new BehaviorSubject<SifraNamjene[]>([]);
  public readonly sifraNamjene$: Observable<SifraNamjene[]> = this.sifraNamjeneSubject.asObservable();

  constructor(private sifraService: SifraNamjeneService) {
  }

  getAll(): Observable<SifraNamjene[]> {
    const observable = this.sifraService.getAll().pipe(
      map(m => m.sort((a, b) => a.rbr < b.rbr ? -1 : 1))
    );
    observable.subscribe(res => {
      this.sifraNamjeneSubject.next(res);
    });
    return observable;
  }

  getSubjectData(): SifraNamjene[] {
    let sifra = [];
    this.sifraNamjene$.subscribe(res => {
      sifra = res;
    });
    return sifra;
  }
}
