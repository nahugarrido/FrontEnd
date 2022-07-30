import { Component, OnInit } from '@angular/core';
import { NgbModalConfig,NgbModal,ModalDismissReasons,  } from '@ng-bootstrap/ng-bootstrap';
import { PersonaService } from '../service/persona.service';
import { FormsModule,FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../model/persona.model';
import { TokenService } from '../service/token.service';


@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  persona: Persona[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;
  imagen2: string; // PERFIL
  imagen3: string; // BANNER
  roles: string[];
  isAdmin = false;

  constructor(config: NgbModalConfig, 
    private modalService: NgbModal,
    private fb: FormBuilder,
    public httpClient:HttpClient,
    private tokenService : TokenService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  

  ngOnInit(): void {
    this.getPersona();
    this.editForm = this.fb.group({
      id: [''],
      nombre: [''],
      apellido: [''],
      img: [''],
      puesto: [''],
      descripcion: [''],
      img_banner: ['']
    });

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  
  getPersona(){
    this.httpClient.get<any>('http://localhost:8080/personas/traer').subscribe(
      response =>{
        //console.log(response);
        this.persona =response;
      }
      )
    }
    
    /* ALTER TABLE `backendnahuelgarrido`.`persona` MODIFY COLUMN img LONGTEXT; */
    onFileChanged(e){
      //console.log(e);
      this.imagen2= e[0].base64;
      this.editForm.value.img=this.imagen2;
    };

    onFileChanged2(e){
      console.log(e);
      this.imagen3= e[0].base64;
      this.editForm.value.img_banner=this.imagen3;
    };

  onSubmit(f: NgForm) {
    f.form.value.img=this.imagen2;
    // console.log(this.editForm.value);
     //console.log(f.form.value);
     const url = 'http://localhost:8080/personas/crear';
     this.httpClient.post(url, f.value)
       .subscribe((result) => {
        this.ngOnInit(); 
    });
     this.modalService.dismissAll(); 
  }


  openEdit(targetModal, persona:Persona) {
    this.modalService.open(targetModal, {
      centered: false,
      backdrop: 'static',
    });
    this.editForm.patchValue( {
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      img: persona.img,
      puesto: persona.puesto,
      descripcion: persona.descripcion,
      img_banner: persona.img_banner
    });
  }
  
  onSave() {
    //this.editForm.value.img = this.imagen2;
    //sthis.editForm.value.img_banner = this.imagen3;
    //console.log(this.editForm.value);
    const editURL = 'http://localhost:8080/personas/' + 'editar/'  + this.editForm.value.id ;
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, persona:Persona) {
    //console.log(this.deleteId);
    //console.log(persona.id);
    this.deleteId = persona.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/personas/' +  'borrar/'+ this.deleteId ;
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
}



function next(next: any, arg1: (response: any) => void) {
  throw new Error('Function not implemented.');
}



