import { Injectable } from '@angular/core';
import { Educacion } from '../models/index';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EducacionService {
  baseURL: string = environment.baseURL + 'educaciones/';

  constructor(private http: HttpClient) {}

  public getEducacion(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(this.baseURL + 'traer');
  }
  public getEducacionId(id: any): Observable<Educacion> {
    return this.http.get<Educacion>(this.baseURL + 'traer/' + id);
  }
  public addEducacion(educacion: Educacion) {
    return this.http.post<Educacion>(this.baseURL + 'crear', educacion);
  }

  public deleteEducacion(id: any) {
    return this.http.delete<Educacion>(this.baseURL + 'borrar/' + id);
  }

  public updateEducacion(educacion: Educacion) {
    return this.http.put<Educacion>(
      this.baseURL + 'editar/' + educacion.id,
      educacion
    );
  }
}
