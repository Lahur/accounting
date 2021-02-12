import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stranka} from '../models/stranka';
import {publishLast, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StrankaService {

  address = environment.url + '/stranka';
  options: any;

  constructor(private http: HttpClient) {
    this.options = {headers: new HttpHeaders({'Content-Type': 'application/json'}), withCredentials: false};
  }

  getAll(): Observable<Stranka[]> {
    return this.http.get(this.address, this.options).pipe(publishLast(), refCount());
  }

  getForKorisnik(): Observable<Stranka[]> {
    return this.http.get(this.address + '/korisnik', this.options).pipe(publishLast(), refCount());
  }

  getOther(): Observable<Stranka[]> {
    return this.http.get(this.address + '/other', this.options).pipe(publishLast(), refCount());
  }

  save(stranka: Stranka): Observable<Stranka> {
    const body = JSON.stringify(stranka);
    return this.http.post(this.address, body, this.options).pipe(publishLast(), refCount());
  }

  saveMyStranka(stranka: Stranka): Observable<Stranka> {
    const body = JSON.stringify(stranka);
    return this.http.post(this.address + '/my-stranka', body, this.options).pipe(publishLast(), refCount());
  }
}
