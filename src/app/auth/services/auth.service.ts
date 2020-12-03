import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { RegisterRequestInterface } from './../types/registerRequest.interface';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from './../../shared/types/currentUser.interface';
import { environment } from 'src/environments/environment';
import { AuthResponseInterface } from '../types/authResponse.interface';
import {map} from 'rxjs/operators';
import { LoginRequestInterfase } from './../types/loginReqest,interface';

@Injectable()

export class AuthService {
  constructor(private http: HttpClient) {
  }

  getUser(response: AuthResponseInterface): CurrentUserInterface{
    return response.user;
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users'

    return this.http.post<AuthResponseInterface>(url, data)
    .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterfase): Observable<CurrentUserInterface>{
    const url = environment.apiUrl + '/users/login'

    return this.http
    .post<AuthResponseInterface>(url, data)
    .pipe(map(this.getUser));

  }
}
