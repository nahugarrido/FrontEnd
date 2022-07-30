
import { Component, OnInit } from '@angular/core';
import { NgbModalConfig,NgbModal,ModalDismissReasons,  } from '@ng-bootstrap/ng-bootstrap';
import { ExperienciaService } from '../service/experiencia.service';
import { FormsModule,FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Experiencia } from '../model/experiencia.model';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})

export class ExperienciaComponent implements OnInit {

  experiencia: Experiencia[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;
  imagen2: string;
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
    this.getExperiencia();
    this.editForm = this.fb.group({
      id: [''],
      empresa: [''],
      puesto: [''],
      descripcion: [''],
      fecha_inicio: [''],
      fecha_finalizacion: [''],
      img: [''],
    });
    
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  
  getExperiencia(){
    this.httpClient.get<any>('http://localhost:8080/experiencias/traer').subscribe(
      response =>{
        //console.log(response);
        this.experiencia =response;
      }
      )
    }
    
    /* ALTER TABLE `backendnahuelgarrido`.`experiencia` MODIFY COLUMN img LONGTEXT; */
    onFileChanged(e){
      console.log(e);
      this.imagen2= e[0].base64;
      this.editForm.value.img=this.imagen2;
    };

  onSubmit(f: NgForm) {
    f.form.value.img=this.imagen2;
    // console.log(this.editForm.value);
     console.log(f.form.value);
     const url = 'http://localhost:8080/experiencias/crear';
     this.httpClient.post(url, f.value)
       .subscribe((result) => {
        this.ngOnInit(); 
    });
     this.modalService.dismissAll(); 
  }


  openEdit(targetModal, experiencia:Experiencia) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
    this.editForm.patchValue( {
      id: experiencia.id,
      empresa: experiencia.empresa,
      puesto: experiencia.puesto,
      descripcion: experiencia.descripcion,
      fecha_inicio: experiencia.fecha_inicio,
      fecha_finalizacion: experiencia.fecha_finalizacion,
      img: experiencia.img,
    });
  }
  
  

  onSave() {
    //this.editForm.value.img = this.imagen2;
    console.log(this.editForm.value);
    const editURL = 'http://localhost:8080/experiencias/' + 'editar/'  + this.editForm.value.id ;
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, experiencia:Experiencia) {
    console.log(this.deleteId);
    console.log(experiencia.id);
    this.deleteId = experiencia.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/experiencias/' +  'borrar/'+ this.deleteId ;
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


