import { Component, OnInit } from '@angular/core';

import { NgbModalConfig,NgbModal,ModalDismissReasons,  } from '@ng-bootstrap/ng-bootstrap';
import { HabilidadService } from '../service/habilidad.service';
import { FormsModule,FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Habilidad } from '../model/habilidad.model';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  habilidad: Habilidad[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;

  constructor(config: NgbModalConfig, 
    private modalService: NgbModal,
    private fb: FormBuilder,
    public httpClient:HttpClient) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  

  ngOnInit(): void {
    this.gethabilidad();
    this.editForm = this.fb.group({
      id: [''],
      habilidad: [''],
      nivel: [''],

    });
  }
  
  gethabilidad(){
    this.httpClient.get<any>('http://localhost:8080/habilidades/traer').subscribe(
      response =>{
        //console.log(response);
        this.habilidad =response;
      }
      )
    }
    
  onSubmit(f: NgForm) {
    // console.log(this.editForm.value);
     console.log(f.form.value);
     const url = 'http://localhost:8080/habilidades/crear';
     this.httpClient.post(url, f.value)
       .subscribe((result) => {
        this.ngOnInit(); 
    });
     this.modalService.dismissAll(); 
  }


  openEdit(targetModal, habilidad:Habilidad) {
    this.modalService.open(targetModal, {
      centered: false,
      backdrop: 'static',
    });
    this.editForm.patchValue( {
      id: habilidad.id,
      habilidad: habilidad.habilidad,
      nivel: habilidad.nivel,
    });
  }
  
  

  onSave() {
    console.log(this.editForm.value);
    const editURL = 'http://localhost:8080/habilidades/' + 'editar/'  + this.editForm.value.id ;
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, habilidad:Habilidad) {
    console.log(this.deleteId);
    console.log(habilidad.id);
    this.deleteId = habilidad.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/habilidades/' +  'borrar/'+ this.deleteId ;
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


