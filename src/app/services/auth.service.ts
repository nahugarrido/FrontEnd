import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDto, LoginUsuario, Register } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = environment.baseURL + 'auth/';

  constructor(private httpClient: HttpClient) {}

  public nuevo(register: Register): Observable<any> {
    return this.httpClient.post<any>(this.baseURL + 'nuevo', register);
  }

  public login(login: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.baseURL + 'login', login);
  }
}
