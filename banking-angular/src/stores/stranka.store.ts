import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Stranka} from '../models/stranka';
import {StrankaService} from '../services/stranka.service';

@Injectable({
  providedIn: 'root'
})
export class StrankaStore {

  private strankaSubject: BehaviorSubject<Stranka[]> = new BehaviorSubject<Stranka[]>([]);
  public readonly stranka$: Observable<Stranka[]> = this.strankaSubject.asObservable();

  constructor(private strankaService: StrankaService) {
  }

  getAll(): Observable<Stranka[]> {
    const observable = this.strankaService.getAll();
    observable.subscribe(res => {
      this.strankaSubject.next(res);
    });
    return observable;
  }

  getForKorisnik(): Observable<Stranka[]> {
    const observable = this.strankaService.getForKorisnik();
    observable.subscribe(res => {
      this.strankaSubject.next(res);
    });
    return observable;
  }

  getOther(): Observable<Stranka[]> {
    const observable = this.strankaService.getOther();
    observable.subscribe(res => {
      this.strankaSubject.next(res);
    });
    return observable;
  }

  save(stranka: Stranka): Observable<Stranka> {
    const observable = this.strankaService.save(stranka);
    observable.subscribe(res => {
      const data = this.getSubjectData();
      this.strankaSubject.next(data.concat(res));
    });
    return observable;
  }

  saveMyStranka(stranka: Stranka): Observable<Stranka> {
    const observable = this.strankaService.saveMyStranka(stranka);
    observable.subscribe(res => {
      const data = this.getSubjectData();
      this.strankaSubject.next(data.concat(res));
    });
    return observable;
  }

  getSubjectData(): Stranka[] {
    let stranke = [];
    this.stranka$.subscribe(res => {
      stranke = res;
    });
    return stranke;
  }
}
