import { Component, OnInit } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { EducacionService, TokenService } from '../../services/index';
import { FormsModule, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Educacion } from '../../models/index';
/* ALTER TABLE `backendnahuelgarrido`.`educacion` MODIFY COLUMN imagen LONGTEXT; */

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  educacion: Educacion[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;
  imagen2: string;
  roles: string[];
  isAdmin = false;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    public httpClient: HttpClient,
    private tokenService: TokenService
  ) {
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
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  getEducacion() {
    this.httpClient
      .get<any>('https://backendnahuelgarrido.herokuapp.com/educaciones/traer')
      .subscribe((response) => {
        this.educacion = response;
      });
  }

  onFileChanged(e) {
    console.log(e);
    this.imagen2 = e[0].base64;
    this.editForm.value.img = this.imagen2;
  }

  onSubmit(f: NgForm) {
    f.form.value.img = this.imagen2; /// ESTO ES LO QUE LO ROMPE
    console.log(f.form.value);
    const url = 'https://backendnahuelgarrido.herokuapp.com/educaciones/crear';
    this.httpClient.post(url, f.value).subscribe((result) => {
      this.ngOnInit();
    });
    this.modalService.dismissAll();
  }

  openEdit(targetModal, educacion: Educacion) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
    this.editForm.patchValue({
      id: educacion.id,
      titulo: educacion.titulo,
      institucion: educacion.institucion,
      descripcion: educacion.descripcion,
      fecha_inicio: educacion.fecha_inicio,
      fecha_finalizacion: educacion.fecha_finalizacion,
      img: educacion.img,
    });
    console.log('Open edit:', educacion);
  }

  onSave() {
    const editURL =
      'https://backendnahuelgarrido.herokuapp.com/educaciones/' +
      'editar/' +
      this.editForm.value.id;
    this.httpClient.put(editURL, this.editForm.value).subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
  }

  openDelete(targetModal, educacion: Educacion) {
    console.log(this.deleteId);
    this.deleteId = educacion.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
    });
  }

  onDelete() {
    const deleteURL =
      'https://backendnahuelgarrido.herokuapp.com/educaciones/' +
      'borrar/' +
      this.deleteId;
    this.httpClient.delete(deleteURL).subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
