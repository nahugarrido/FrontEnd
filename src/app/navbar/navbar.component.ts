import { Component, OnInit } from '@angular/core';
import { Contacto } from '../model/contacto.model';
import { ContactoService } from '../service/contacto.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  contacto: Contacto[] = [];
  constructor(public contactoService: ContactoService) { }

  ngOnInit(): void {
    this.contactoService.getContacto().subscribe(data => {this.contacto = data})
    //console.log(this.contacto);
  }

}
