
import { Component, OnInit } from '@angular/core';
import { NgbModalConfig,NgbModal,ModalDismissReasons,  } from '@ng-bootstrap/ng-bootstrap';
import { ExperienciaService } from '../service/experiencia.service';
import { FormsModule,FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Experiencia } from '../model/experiencia.model';

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
  img: string;

  constructor(config: NgbModalConfig, 
    private modalService: NgbModal,
    private fb: FormBuilder,
    public httpClient:HttpClient) {
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
  }

   getExperiencia(){
    this.httpClient.get<any>('http://localhost:8080/experiencias/traer').subscribe(
       response =>{
        console.log(response);
        this.experiencia =response;
      }
    )
  }


  onSubmit(f: NgForm) {
    console.log(f.form.value);
    const url = 'http://localhost:8080/experiencias/crear';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); // reload the table
      });
    this.modalService.dismissAll(); // dismiss the modal
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
  
  onFileChanged(e){
    console.log(e);
   this.img= e[0].base64;
  };

}



function next(next: any, arg1: (response: any) => void) {
  throw new Error('Function not implemented.');
}


