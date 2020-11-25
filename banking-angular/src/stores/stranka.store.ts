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

  getSubjectData(): Stranka[] {
    let stranke = [];
    this.stranka$.subscribe(res => {
      stranke = res;
    });
    return stranke;
  }
}
