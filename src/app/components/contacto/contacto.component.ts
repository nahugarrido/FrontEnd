import { Component, OnInit } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Contacto } from '../../models/index';
import { ContactoService, TokenService } from '../../services/index';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent implements OnInit {
  contacto: Contacto[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;
  roles: string[];
  isAdmin = false;
  formEmail: string;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    public httpClient: HttpClient,
    private tokenService: TokenService,
    private contactoService: ContactoService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getContacto();
    this.editForm = this.fb.group({
      id: [''],
      github_url: [''],
      linkedin_url: [''],
    });

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  getContacto() {
    this.contactoService.getContacto().subscribe((response) => {
      this.contacto = response;
    });
  }

  onSubmit(f: NgForm) {
    this.contactoService.addContacto(f.value).subscribe((result) => {
      this.ngOnInit();
    });
    this.modalService.dismissAll();
  }

  onSave() {
    this.contactoService
      .updateContacto(this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  onDelete() {
    this.contactoService.deleteContacto(this.deleteId).subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
  }

  openEdit(targetModal, contacto: Contacto) {
    this.modalService.open(targetModal, {
      centered: false,
      backdrop: 'static',
    });
    this.editForm.patchValue({
      id: contacto.id,
      github_url: contacto.github_url,
      linkedin_url: contacto.linkedin_url,
    });
  }

  openDelete(targetModal, contacto: Contacto) {
    console.log(this.deleteId);
    console.log(contacto.id);
    this.deleteId = contacto.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
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
