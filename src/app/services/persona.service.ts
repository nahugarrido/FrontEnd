import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../models/index';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  baseURL: string = environment.baseURL + 'personas/';

  constructor(private http: HttpClient) {}

  public getPersona(): Observable<Persona[]> {
    
    return this.http.get<Persona[]>(this.baseURL + 'traer');
  }
  public getPersonaId(id: any): Observable<Persona> {
    return this.http.get<Persona>(this.baseURL + 'traer/' + id);
  }
  public addPersona(persona: Persona) {
    return this.http.post<Persona>(this.baseURL + 'crear', persona);
  }

  public deletePersona(id: any) {
    return this.http.delete<Persona>(this.baseURL + 'borrar/' + id);
  }

  public updatePersona(persona: Persona) {
    return this.http.put<Persona>(
      this.baseURL + 'editar/' + persona.id,
      persona
    );
  }
}
