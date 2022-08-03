import { Component, OnInit } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../../models/index';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css'],
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

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    public httpClient: HttpClient,
    private tokenService: TokenService,
    private personaService: PersonaService
  ) {
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
      img_banner: [''],
    });

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  getPersona() {
    this.personaService.getPersona().subscribe((response) => {
      this.persona = response;
    });
  }

  /* ALTER TABLE `backendnahuelgarrido`.`persona` MODIFY COLUMN img LONGTEXT; */
  onFileChanged(e) {
    this.imagen2 = e[0].base64;
    this.editForm.value.img = this.imagen2;
  }

  onFileChanged2(e) {
    console.log(e);
    this.imagen3 = e[0].base64;
    this.editForm.value.img_banner = this.imagen3;
  }

  onSubmit(f: NgForm) {
    f.form.value.img = this.imagen2;
    this.personaService.addPersona(f.value).subscribe((result) => {
      this.ngOnInit();
    });
    this.modalService.dismissAll();
  }

  openEdit(targetModal, persona: Persona) {
    this.modalService.open(targetModal, {
      centered: false,
      backdrop: 'static',
    });
    this.editForm.patchValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      img: persona.img,
      puesto: persona.puesto,
      descripcion: persona.descripcion,
      img_banner: persona.img_banner,
    });
  }

  onSave() {
    this.personaService
      .updatePersona(this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, persona: Persona) {
    this.deleteId = persona.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
    });
  }

  onDelete() {
    this.personaService.deletePersona(this.deleteId).subscribe((results) => {
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
