import { Injectable } from '@angular/core';
import { Experiencia } from '../model/experiencia.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  URL = 'http://localhost:8080/experiencias/';


  
  constructor(private http: HttpClient) { }

  public getExperiencia(): Observable<Experiencia[]>  {
    return this.http.get<Experiencia[]>(this.URL + 'traer');
  }
  public getExperienciaId(id: any): Observable<Experiencia> {
    return this.http.get<Experiencia>(this.URL + 'traer/' + id);
  }
  public addExperiencia(experiencia: Experiencia) {
    return this.http.post<Experiencia>(this.URL + 'crear', experiencia);
    // .pipe(
    //   tap(()=>{
    //     this._refresh$.next();
    //   })
 //)
  }

  public deleteExperiencia(id: any) {
    return this.http.delete<Experiencia>(this.URL + 'borrar/' + id);
  }

  public updateExperiencia(experiencia: Experiencia) {
    return this.http.put<Experiencia>(this.URL + 'editar/'+ experiencia.id,experiencia)
    // .pipe(
    //   tap(()=>{
    //     this._refresh$.next();
    //   })
    // )
  }
 

}