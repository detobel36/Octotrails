import { Injectable, APP_INITIALIZER, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';
import { catchError, tap } from 'rxjs/operators';

/**
 * Load && Set en as the default app language
 * @param service
 */
export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use('en');
}

export interface TranslationChangeEvent {
  translations: any;
  lang: string;
}

export interface LangChangeEvent {
  lang: string;
  translations: any;
}

export interface DefaultLangChangeEvent {
  lang: string;
  translations: any;
}

@Injectable({
  providedIn: 'root'
  // useFactory: setupTranslateFactory,
  // deps: [TranslateService],
  // useClass: APP_INITIALIZER,
  // useExisting: APP_INITIALIZER
})
export class TranslateService {
  /**
   * An EventEmitter to listen to lang change events
   * onLangChange.subscribe((params: LangChangeEvent) => {
   *     // do something
   * });
   */
  public onLangChange: EventEmitter<LangChangeEvent> = new EventEmitter<
    LangChangeEvent
  >();

  /**
   * An EventEmitter to listen to default lang change events
   * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
   *     // do something
   * });
   */
  public onDefaultLangChange: EventEmitter<
    DefaultLangChangeEvent
  > = new EventEmitter<DefaultLangChangeEvent>();

  /**
   * The default lang to fallback when translations are missing on the current lang
   */
  public defaultLang: string;

  /**
   * The lang currently used
   */
  public currentLang: string;

  /**
   * Available langs
   */
  public langs: Array<string> = [];

  /**
   * List of translations/lang
   */
  public translations: any = {};

  constructor(private http: HttpClient) {
    this.defaultLang = this.getBrowserLang();
  }

  /**
   * Initiate the file download and language switch.
   * @param lang Lang to currently use.
   */
  use(lang: string): Observable<Object> {
    this.currentLang = lang || this.defaultLang;
    const langPath = `assets/i18n/${this.currentLang}.json`;

    return this.http.get<Object>(langPath).pipe(
      tap(trans => (this.translations = trans)),
      catchError(this.handleError('searchStops', {}))
    );
  }

  /**
   * Get the language code name from the browser, e.g. "de"
   */
  public getBrowserLang(): string {
    if (
      typeof window === 'undefined' ||
      typeof window.navigator === 'undefined'
    ) {
      return undefined;
    }

    let browserLang: any = window.navigator.languages
      ? window.navigator.languages[0]
      : null;
    browserLang =
      browserLang ||
      window.navigator.language ||
      window.navigator.browserLanguage ||
      window.navigator.userLanguage;

    if (browserLang.indexOf('-') !== -1) {
      browserLang = browserLang.split('-')[0];
    }

    if (browserLang.indexOf('_') !== -1) {
      browserLang = browserLang.split('_')[0];
    }

    return browserLang;
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
