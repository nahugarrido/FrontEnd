import { Component, OnInit } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { ProyectoService, TokenService } from '../../services/index';
import { Proyecto } from '../../models/index';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  proyecto: Proyecto[];
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
    private tokenService: TokenService,
    private proyectoService: ProyectoService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getProyecto();
    this.editForm = this.fb.group({
      id: [''],
      nombre: [''],
      fecha: [''],
      descripcion: [''],
      livecode_url: [''],
      sourcecode_url: [''],
      img: [''],
    });

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  getProyecto() {
    this.proyectoService.getProyecto().subscribe((response) => {
      this.proyecto = response;
    });
  }

  /* ALTER TABLE `backendnahuelgarrido`.`proyecto` MODIFY COLUMN img LONGTEXT; */
  onFileChanged(e) {
    console.log(e);
    this.imagen2 = e[0].base64;
    this.editForm.value.img = this.imagen2;
  }

  onSubmit(f: NgForm) {
    f.form.value.img = this.imagen2;
    this.proyectoService.addProyecto(f.value).subscribe((result) => {
      this.ngOnInit();
    });
    this.modalService.dismissAll();
  }

  openEdit(targetModal, proyecto: Proyecto) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
    this.editForm.patchValue({
      id: proyecto.id,
      nombre: proyecto.nombre,
      fecha: proyecto.fecha,
      descripcion: proyecto.descripcion,
      livecode_url: proyecto.livecode_url,
      sourcecode_url: proyecto.sourcecode_url,
      img: proyecto.img,
    });
  }

  onSave() {
    this.proyectoService
      .updateProyecto(this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, proyecto: Proyecto) {
    console.log(this.deleteId);
    console.log(proyecto.id);
    this.deleteId = proyecto.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
    });
  }

  onDelete() {
    this.proyectoService.deleteProyecto(this.deleteId).subscribe((results) => {
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
