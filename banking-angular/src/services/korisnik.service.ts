import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KorisnikRequest} from '../models/korisnikRequest';
import {environment} from '../environments/environment';
import {publishLast, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  address = environment.url + '/korisnik';
  options: any;

  constructor(private http: HttpClient) {
    this.options = {headers: new HttpHeaders({'Content-Type': 'application/json'}), withCredentials: false};
  }

  register(korisnik: KorisnikRequest): Observable<any> {
    const body = JSON.stringify(korisnik);
    return this.http.post(this.address + '/registriraj', body, this.options).pipe(publishLast(), refCount());
  }
}
