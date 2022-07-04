import { Component, OnInit } from '@angular/core';
import { persona } from '../model/persona.model';
import { PersonaService } from '../service/persona.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  personas: persona[] = [];
  constructor(public personaService: PersonaService) { }

  /// CAMBIO ACA
  ngOnInit(): void {
    this.personaService.getPersona().subscribe(data => {this.personas = data})
  }

}
