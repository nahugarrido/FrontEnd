import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contacto } from '../model/contacto.model';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  URL = 'http://localhost:8080/contactos/';

  constructor(private http: HttpClient) { }

  public getContacto(): Observable<Contacto[]>  {
    return this.http.get<Contacto[]>(this.URL + 'traer');
  }
  public getContactoId(id: any): Observable<Contacto> {
    return this.http.get<Contacto>(this.URL + 'traer/' + id);
  }
  public addContacto(contacto: Contacto) {
    return this.http.post<Contacto>(this.URL + 'crear', contacto);

  }

  public deleteContacto(id: any) {
    return this.http.delete<Contacto>(this.URL + 'borrar/' + id);
  }

  public updateContacto(contacto: Contacto) {
    return this.http.put<Contacto>(this.URL + 'editar/'+ contacto.id,contacto)
  }
}
