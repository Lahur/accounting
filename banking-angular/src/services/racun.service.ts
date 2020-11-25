import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Racun} from '../models/racun';
import {publishLast, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RacunService {

  address = environment.url + '/racun';
  options: any;

  constructor(private http: HttpClient) {
    this.options = {headers: new HttpHeaders({'Content-Type': 'application/json'}), withCredentials: false};
  }

  getAll(): Observable<Racun[]> {
    return this.http.get(this.address, this.options).pipe(publishLast(), refCount());
  }

  save(racun: Racun): Observable<Racun> {
    const body = JSON.stringify(racun);
    return this.http.post(this.address, body, this.options).pipe(publishLast(), refCount());
  }
}
