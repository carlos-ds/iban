import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Iban, ValidationResult } from '../models/iban.interface';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class IbanService {
  private NUMBER_OF_PREVIOUS_IBANS_TO_DISPLAY = 5;
  private defaultOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private readonly http: HttpClient) {}

  /**
   * Generic error handling function. Source: https://angular.io/tutorial/toh-pt6.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public getGeneratedIbans(amount: number = this.NUMBER_OF_PREVIOUS_IBANS_TO_DISPLAY): Observable<Iban[]> {
    return this.http
      .get<Iban[]>(environment.apiUrl + '/?limit=' + amount + '&createdBy=GENERATION')
      .pipe(catchError(this.handleError<Iban[]>('getIbans', [])));
  }

  public createIban(): Observable<Iban[]> {
    return this.http
      .get<Iban[]>(environment.apiUrl + '/create')
      .pipe(catchError(this.handleError<Iban[]>('createIban', [])));
  }

  public validateIban(accountNumber): Observable<ValidationResult> {
    return this.http.post<ValidationResult>(
      `${environment.apiUrl}/validate`,
      JSON.stringify(accountNumber),
      this.defaultOptions
    );
  }
}
