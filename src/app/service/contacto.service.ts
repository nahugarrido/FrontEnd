import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { contacto } from '../model/contacto.model';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  URL = 'http://localhost:8080/contactos/';

  constructor(private http: HttpClient) { }

    /// CAMBIO ACA
    public getContacto(){
      return this.http.get<contacto[]>(this.URL+ 'traer/');
    }
}
