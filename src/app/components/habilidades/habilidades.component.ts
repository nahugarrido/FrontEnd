import { Component, OnInit } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { HabilidadService, TokenService } from '../../services/index';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Habilidad } from '../../models/index';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css'],
})
export class HabilidadesComponent implements OnInit {
  habilidad: Habilidad[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;
  roles: string[];
  isAdmin = false;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    public httpClient: HttpClient,
    private tokenService: TokenService,
    private habilidadService: HabilidadService
  ) {
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

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  gethabilidad() {
    this.habilidadService.getHabilidad().subscribe((response) => {
      this.habilidad = response;
    });
  }

  onSubmit(f: NgForm) {
    this.habilidadService.addHabilidad(f.value).subscribe((result) => {
      this.ngOnInit();
    });
    this.modalService.dismissAll();
  }

  openEdit(targetModal, habilidad: Habilidad) {
    this.modalService.open(targetModal, {
      centered: false,
      backdrop: 'static',
    });
    this.editForm.patchValue({
      id: habilidad.id,
      habilidad: habilidad.habilidad,
      nivel: habilidad.nivel,
    });
  }

  onSave() {
    this.habilidadService
      .updateHabilidad(this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, habilidad: Habilidad) {
    this.deleteId = habilidad.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
    });
  }

  onDelete() {
    this.habilidadService
      .deleteHabilidad(this.deleteId)
      .subscribe((results) => {
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
