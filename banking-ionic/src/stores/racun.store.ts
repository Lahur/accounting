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

  getIngoing(): Observable<Racun[]> {
    const observable = this.racunService.getIngoing();
    observable.subscribe(res => {
      this.racunSubject.next(res);
    });

    return observable;
  }

  getOutgoing(): Observable<Racun[]> {
    const observable = this.racunService.getOutgoing();
    observable.subscribe(res => {
      this.racunSubject.next(res);
    });

    return observable;
  }

  saveIngoing(racun: Racun): Observable<Racun> {
    const observable = this.racunService.saveIngoing(racun);
    observable.subscribe(res => {
      const data = this.getSubjectData();
      this.racunSubject.next(data.concat(res));
    });
    return observable;
  }

  saveOutgoing(racun: Racun): Observable<Racun> {
    const observable = this.racunService.saveOutgoing(racun);
    observable.subscribe(res => {
      const data = this.getSubjectData();
      this.racunSubject.next(data.concat(res));
    });
    return observable;
  }

  getPdf(id: string): void {
    this.racunService.getPdf(id).subscribe(x => {

      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      const newBlob = new Blob([x], { type: 'application/pdf' });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);

      const link = document.createElement('a');
      link.href = data;
      link.download = 'report.pdf';
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);

    });
  }



  getSubjectData(): Racun[] {
    let racuni = [];
    this.racun$.subscribe(res => {
      racuni = res;
    });
    return racuni;
  }
}
