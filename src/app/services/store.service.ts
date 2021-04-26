import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private loggedSubject = new BehaviorSubject<boolean>(false);
  private httpErrorSubject = new BehaviorSubject<string>("");
  private dialogTextSubject = new BehaviorSubject<{
    text: string,
  }>({text: ""});

  dialog$: Observable<{
    text: string,
  }> = this.dialogTextSubject.asObservable();
  httpError$: Observable<string> = this.httpErrorSubject.asObservable();
  isLoggedIn$: Observable<boolean> = this.loggedSubject.asObservable();
  isLoggedOut$: Observable<boolean>;

  constructor() {
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
  }

  setDialogMessage(message: string) {
    this.dialogTextSubject.next({text: message})
  }

  setHttpError(error: string) {
    this.httpErrorSubject.next(error);
  }

  setLoggedState(state: boolean) {
    this.loggedSubject.next(state);
  }
}
