import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Iban, ValidationResult } from '../models/iban.model';

const API: string = 'http://localhost:3306';
const numberOfPreviousIbans: number = 5;

@Injectable()
export class IbanService {
  constructor(private http: HttpClient) {}

  /**
   * Source: https://angular.io/tutorial/toh-pt6
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  get(): Observable<Iban[]> {
    return this.http.get<Iban[]>(API + '/?limit=' + numberOfPreviousIbans);
  }

  create(): Observable<Iban[]> {
    return this.http.get<Iban[]>(API + '/create');
  }

  validate(accountNumber: string): Observable<any> {
    return this.http
      .post(API + '/validate', { accountNumber })
      .pipe(catchError(this.handleError('validateIban')));
  }
}
