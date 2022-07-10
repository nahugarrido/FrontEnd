import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../model/proyecto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  URL = 'http://localhost:8080/proyectos/';

  constructor(private http: HttpClient) { }
  public getProyecto(): Observable<Proyecto[]>  {
    return this.http.get<Proyecto[]>(this.URL + 'traer');
  }
  public getProyectoId(id: any): Observable<Proyecto> {
    return this.http.get<Proyecto>(this.URL + 'traer/' + id);
  }
  public addProyecto(proyecto: Proyecto) {
    return this.http.post<Proyecto>(this.URL + 'crear', proyecto);

  }

  public deleteProyecto(id: any) {
    return this.http.delete<Proyecto>(this.URL + 'borrar/' + id);
  }

  public updateProyecto(proyecto: Proyecto) {
    return this.http.put<Proyecto>(this.URL + 'editar/'+ proyecto.id,proyecto)
  }
  
}
