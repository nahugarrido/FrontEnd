import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/index';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  baseURL: string = environment.baseURL + 'proyectos/';

  constructor(private http: HttpClient) {}
  public getProyecto(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.baseURL + 'traer');
  }
  public getProyectoId(id: any): Observable<Proyecto> {
    return this.http.get<Proyecto>(this.baseURL + 'traer/' + id);
  }
  public addProyecto(proyecto: Proyecto) {
    return this.http.post<Proyecto>(this.baseURL + 'crear', proyecto);
  }

  public deleteProyecto(id: any) {
    return this.http.delete<Proyecto>(this.baseURL + 'borrar/' + id);
  }

  public updateProyecto(proyecto: Proyecto) {
    return this.http.put<Proyecto>(
      this.baseURL + 'editar/' + proyecto.id,
      proyecto
    );
  }
}
