import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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

  getIngoing(): Observable<Racun[]> {
    return this.http.get(this.address + '/ingoing', this.options).pipe(publishLast(), refCount());
  }

  getOutgoing(): Observable<Racun[]> {
    return this.http.get(this.address + '/outgoing', this.options).pipe(publishLast(), refCount());
  }

  saveIngoing(racun: Racun): Observable<Racun> {
    const body = JSON.stringify(racun);
    return this.http.post(this.address + '/ingoing', body, this.options).pipe(publishLast(), refCount());
  }

  saveOutgoing(racun: Racun): Observable<Racun> {
    const body = JSON.stringify(racun);
    return this.http.post(this.address + '/outgoing', body, this.options).pipe(publishLast(), refCount());
  }

  delete(id: string): Observable<void> {
    const options: any = {};
    options.headers = this.options.headers;
    options.withCredentials = this.options.withCredentials;
    let params = new HttpParams();
    params = params.append('id', id);
    options.params = params;

    return this.http.delete(this.address, options).pipe(publishLast(), refCount());
  }

  getPdf(id: string): Observable<any> {
    const headers = new HttpHeaders({

    });
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get(this.address + '/pdf', {headers, params, responseType: 'blob'});
  }

  getXml(ids: string[]): Observable<any> {
    const body = JSON.stringify(ids);
    const options: any = {};
    options.headers = this.options.headers;
    options.withCredentials = this.options.withCredentials;
    options.responseType = 'blob';
    return this.http.post(this.address + '/xml', body, options);
  }
}
