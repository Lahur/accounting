import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Grad} from '../models/grad';
import {GradService} from '../services/grad.service';

@Injectable({
  providedIn: 'root'
})
export class GradoviStore {

  private gradSubject: BehaviorSubject<Grad[]> = new BehaviorSubject<Grad[]>([]);
  public readonly grad$: Observable<Grad[]> = this.gradSubject.asObservable();

  constructor(private gradService: GradService) {
  }

  getSubjectData(): Grad[] {
    let grad = [];
    this.grad$.subscribe(res => {
      grad = res;
    });
    return grad;
  }

}
