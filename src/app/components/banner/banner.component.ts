import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../../models/index';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  persona: Persona[];

  constructor(
    public httpClient: HttpClient,
    private personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.getPersona();
  }

  getPersona() {
    this.personaService.getPersona().subscribe((response) => {
      this.persona = response;
    });
  }
}
