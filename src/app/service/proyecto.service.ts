import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { proyecto } from '../model/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  URL = 'http://localhost:8080/proyectos/';

  constructor(private http: HttpClient) { }

  public getProyecto(){
    return this.http.get<proyecto[]>(this.URL+ 'traer/');
  }
}
