import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, shareReplay, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../api/user";
import {filter, map} from "rxjs/operators";

export const ANONYMOUS_USER: User = {
  id: -1,
  name: '',
  email: '',
  messages: [],
  roles: [],
};


@Injectable()
export class AuthService {

  private subject = new BehaviorSubject<User>(ANONYMOUS_USER);

  user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));

  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private http: HttpClient) {
    http.get<User>('/api/user').pipe(
      tap(console.log))
      .subscribe(user => this.subject.next(user ? user : ANONYMOUS_USER));
  }

  register(email: string, password: string) {

    return this.http.post<User>('/api/register', {email, password}).pipe(
      shareReplay(),
      tap(user => this.subject.next(user)),);
  }

  login(email: string, password: string) {
    return this.http.post<User>('/api/login', {email, password}).pipe(
      shareReplay(),
      tap(user => this.subject.next(user)),);
  }

  loginAsUser(email: string) {
    return this.http.post<User>('/api/admin', {email}).pipe(
      shareReplay(),
      tap(user => this.subject.next(user)),);
  }

  logout(): Observable<any> {
    return this.http.post('/api/logout', null).pipe(
      shareReplay(),
      tap(user => this.subject.next(ANONYMOUS_USER)),);
  }
}
