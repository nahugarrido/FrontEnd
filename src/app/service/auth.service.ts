import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../model/jwt-dto.model';
import { LoginUsuario } from '../model/login.model';
import { Register } from '../model/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth';

  constructor(private httpClient: HttpClient) { }

  public nuevo(register: Register): Observable<any>{
    return this.httpClient.post<any>(this.authURL + '/nuevo', register);
  }

  public login(login: LoginUsuario): Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.authURL + '/login', login);
  }
}