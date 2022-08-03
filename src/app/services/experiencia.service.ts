import { Injectable } from '@angular/core';
import { Experiencia } from '../models/index';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  baseURL: string = environment.baseURL + 'experiencias/';

  constructor(private http: HttpClient) {}

  public getExperiencia(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.baseURL + 'traer');
  }
  public getExperienciaId(id: any): Observable<Experiencia> {
    return this.http.get<Experiencia>(this.baseURL + 'traer/' + id);
  }
  public addExperiencia(experiencia: Experiencia) {
    return this.http.post<Experiencia>(this.baseURL + 'crear', experiencia);
  }

  public deleteExperiencia(id: any) {
    return this.http.delete<Experiencia>(this.baseURL + 'borrar/' + id);
  }

  public updateExperiencia(experiencia: Experiencia) {
    return this.http.put<Experiencia>(
      this.baseURL + 'editar/' + experiencia.id,
      experiencia
    );
  }
}
