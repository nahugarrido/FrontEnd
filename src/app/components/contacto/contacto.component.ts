import { Component, OnInit } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  NgForm,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Contacto } from '../../models/index';
import { AppComponent } from '../../app.component';
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
    private tokenService: TokenService
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
    this.httpClient
      .get<any>('https://backendnahuelgarrido.herokuapp.com/contactos/traer')
      .subscribe((response) => {
        //console.log(response);
        this.contacto = response;
      });
  }

  onSubmit(f: NgForm) {
    // console.log(this.editForm.value);
    console.log(f.form.value);
    const url = 'https://backendnahuelgarrido.herokuapp.com/contactos/crear';
    this.httpClient.post(url, f.value).subscribe((result) => {
      this.ngOnInit();
    });
    this.modalService.dismissAll();
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

  onSave() {
    console.log(this.editForm.value);
    const editURL =
      'https://backendnahuelgarrido.herokuapp.com/contactos/' +
      'editar/' +
      this.editForm.value.id;
    this.httpClient.put(editURL, this.editForm.value).subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
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

  onDelete() {
    const deleteURL =
      'https://backendnahuelgarrido.herokuapp.com/contactos/' +
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
