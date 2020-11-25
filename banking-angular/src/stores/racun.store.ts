import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Racun} from '../models/racun';
import {RacunService} from '../services/racun.service';

@Injectable({
  providedIn: 'root'
})
export class RacunStore {

  private racunSubject: BehaviorSubject<Racun[]> = new BehaviorSubject<Racun[]>([]);
  public readonly racun$: Observable<Racun[]> = this.racunSubject.asObservable();

  constructor(private racunService: RacunService) {
  }

  getAll(): Observable<Racun[]> {
    const observable = this.racunService.getAll();
    observable.subscribe(res => {
      this.racunSubject.next(res);
    });

    return observable;
  }

  save(racun: Racun): Observable<Racun> {
    const observable = this.racunService.save(racun);
    observable.subscribe(res => {
      const data = this.getSubjectData();
      this.racunSubject.next(data.concat(res));
    });
    return observable;
  }



  getSubjectData(): Racun[] {
    let racuni = [];
    this.racun$.subscribe(res => {
      racuni = res;
    });
    return racuni;
  }
}
