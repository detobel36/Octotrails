import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  data: any = {};

  constructor(private http: HttpClient) {}

  use(lang: string = 'en'): Observable<Object> {
    const langPath = `assets/i18n/${lang}.json`;

    return this.http
      .get<Object>(langPath)
      .pipe(catchError(this.handleError('searchStops', {})));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
