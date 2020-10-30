import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Iban } from '../models/iban.model';

const API: string = 'http://localhost:3306';
const numberOfPreviousIbans: number = 5;

@Injectable()
export class IbanService {
  constructor(private http: HttpClient) {}

  getIban(): Observable<Iban[]> {
    return this.http.get<Iban[]>(API + '/?limit=' + numberOfPreviousIbans);
  }

  createIban(): Observable<Iban[]> {
    return this.http.get<Iban[]>(API + '/create');
  }
}
