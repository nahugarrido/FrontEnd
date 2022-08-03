import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contacto } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  baseURL: string = environment.baseURL + 'contactos/';

  constructor(private http: HttpClient) {}

  public getContacto(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(this.baseURL + 'traer');
  }
  public getContactoId(id: any): Observable<Contacto> {
    return this.http.get<Contacto>(this.baseURL + 'traer/' + id);
  }
  public addContacto(contacto: Contacto) {
    return this.http.post<Contacto>(this.baseURL + 'crear', contacto);
  }

  public deleteContacto(id: any) {
    return this.http.delete<Contacto>(this.baseURL + 'borrar/' + id);
  }

  public updateContacto(contacto: Contacto) {
    return this.http.put<Contacto>(
      this.baseURL + 'editar/' + contacto.id,
      contacto
    );
  }
}
