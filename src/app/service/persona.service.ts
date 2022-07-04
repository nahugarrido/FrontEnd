import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  URL = 'http://localhost:8080/personas/';

  constructor(private http: HttpClient) { }

  /// CAMBIO ACA
  public getPersona(){
    return this.http.get<persona[]>(this.URL+ 'traer/');
  }
}
