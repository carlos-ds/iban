import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Iban, ValidationResult } from '../models/iban.model';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
});

const options = {
  headers: httpHeaders,
};

const numberOfPreviousIbans: number = 5;

@Injectable()
export class IbanService {
  constructor(private http: HttpClient) {}

  /**
   * Generic error handling function. Source: https://angular.io/tutorial/toh-pt6.
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

  getGeneratedIbans(): Observable<Iban[]> {
    return this.http
      .get<Iban[]>(
        environment.apiUrl +
          '/?limit=' +
          numberOfPreviousIbans +
          '&createdBy=GENERATION'
      )
      .pipe(catchError(this.handleError<Iban[]>('getIbans', [])));
  }

  createIban(): Observable<Iban[]> {
    return this.http
      .get<Iban[]>(environment.apiUrl + '/create')
      .pipe(catchError(this.handleError<Iban[]>('createIban', [])));
  }

  validateIban(accountNumber): Observable<ValidationResult> {
    return this.http.post<ValidationResult>(
      `${environment.apiUrl}/validate`,
      JSON.stringify(accountNumber),
      options
    );
  }
}
