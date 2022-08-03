import { Injectable } from '@angular/core';
import { Habilidad } from '../models/index';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HabilidadService {
  baseURL: string = environment.baseURL + 'habilidades/';

  constructor(private http: HttpClient) {}

  public getHabilidad(): Observable<Habilidad[]> {
    return this.http.get<Habilidad[]>(this.baseURL + 'traer');
  }
  public getHabilidadId(id: any): Observable<Habilidad> {
    return this.http.get<Habilidad>(this.baseURL + 'traer/' + id);
  }
  public addHabilidad(habilidad: Habilidad) {
    return this.http.post<Habilidad>(this.baseURL + 'crear', habilidad);
  }

  public deleteHabilidad(id: any) {
    return this.http.delete<Habilidad>(this.baseURL + 'borrar/' + id);
  }

  public updateHabilidad(habilidad: Habilidad) {
    return this.http.put<Habilidad>(
      this.baseURL + 'editar/' + habilidad.id,
      habilidad
    );
  }
}
