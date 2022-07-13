import { Component, OnInit } from '@angular/core';
import { NgbModalConfig,NgbModal,ModalDismissReasons,  } from '@ng-bootstrap/ng-bootstrap';
import { PersonaService } from '../service/persona.service';
import { FormsModule,FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../model/persona.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  persona: Persona[];

  constructor(config: NgbModalConfig, 
    public httpClient:HttpClient) {
  }

  

  ngOnInit(): void {
    this.getPersona();
  }
  
  getPersona(){
    this.httpClient.get<any>('http://localhost:8080/personas/traer').subscribe(
      response =>{
        //console.log(response);
        this.persona =response;
      }
      )
    }
}






