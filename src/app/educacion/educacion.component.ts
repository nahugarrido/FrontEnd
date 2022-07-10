import { Component, OnInit } from '@angular/core';
import { NgbModalConfig,NgbModal,ModalDismissReasons,  } from '@ng-bootstrap/ng-bootstrap';
import { EducacionService } from '../service/educacion.service';
import { FormsModule,FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Educacion } from '../model/educacion.model';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  educacion: Educacion[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;
  imagen2: string;

  constructor(config: NgbModalConfig, 
    private modalService: NgbModal,
    private fb: FormBuilder,
    public httpClient:HttpClient) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  

  ngOnInit(): void {
    this.getEducacion();
    this.editForm = this.fb.group({
      id: [''],
      titulo: [''],
      institucion: [''],
      descripcion: [''],
      fecha_inicio: [''],
      fecha_finalizacion: [''],
      img: [''],
    });
  }
  
  getEducacion(){
    this.httpClient.get<any>('http://localhost:8080/educaciones/traer').subscribe(
      response =>{
        //console.log(response);
        this.educacion =response;
      }
      )
    }
    
    /* ALTER TABLE `backendnahuelgarrido`.`educacion` MODIFY COLUMN imagen LONGTEXT; */
    onFileChanged(e){
      console.log(e);
      this.imagen2= e[0].base64;
      this.editForm.value.img=this.imagen2;
    };

  onSubmit(f: NgForm) {
    f.form.value.img= this.imagen2;
    //console.log("ON SUBMIT:", this.editForm.value);
     console.log(f.form.value);
     const url = 'http://localhost:8080/educaciones/crear';
     this.httpClient.post(url, f.value)
       .subscribe((result) => {
        this.ngOnInit(); 
    });
     this.modalService.dismissAll(); 
  }


  openEdit(targetModal, educacion:Educacion) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
    this.editForm.patchValue( {
      id: educacion.id,
      titulo: educacion.titulo,
      institucion: educacion.institucion,
      descripcion: educacion.descripcion,
      fecha_inicio: educacion.fecha_inicio,
      fecha_finalizacion: educacion.fecha_finalizacion,
      img: educacion.img,
    });
  }
  
  

  onSave() {
    this.editForm.value.img = this.imagen2;
    console.log(this.editForm.value);
    const editURL = 'http://localhost:8080/educaciones/' + 'editar/'  + this.editForm.value.id ;
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, educacion:Educacion) {
    console.log(this.deleteId);
    console.log(educacion.id);
    this.deleteId = educacion.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/educaciones/' +  'borrar/'+ this.deleteId ;
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


