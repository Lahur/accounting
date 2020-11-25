import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SifraNamjene} from '../models/sifraNamjene';
import {publishLast, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SifraNamjeneService {

  address = environment.url + '/sifra';
  options: any;

  constructor(private http: HttpClient) {
    this.options = {headers: new HttpHeaders({'Content-Type': 'application/json'}), withCredentials: false};
  }

  getAll(): Observable<SifraNamjene[]> {
    return this.http.get(this.address, this.options).pipe(publishLast(), refCount());;
  }
}
