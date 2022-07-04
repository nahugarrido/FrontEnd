import { Component, OnInit } from '@angular/core';
import { contacto } from '../model/contacto.model';
import { ContactoService } from '../service/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  contactos: contacto[] = [];
  constructor(public contactoService: ContactoService) { }

  ngOnInit(): void {
    this.contactoService.getContacto().subscribe(data => {this.contactos = data})
  }

}