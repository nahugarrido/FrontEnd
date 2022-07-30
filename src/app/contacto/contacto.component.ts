import { Component, OnInit } from '@angular/core';
import { NgbModalConfig,NgbModal,ModalDismissReasons,  } from '@ng-bootstrap/ng-bootstrap';
import { ContactoService } from '../service/contacto.service';
import { FormsModule,FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Contacto } from '../model/contacto.model';
import { AppComponent } from '../app.component';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  contacto: Contacto[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;
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
    this.getContacto();
    this.editForm = this.fb.group({
      id: [''],
      mail_contacto: [''],
      github_url: [''],
      linkedin_url: [''],
    });

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  
  getContacto(){
    this.httpClient.get<any>('http://localhost:8080/contactos/traer').subscribe(
      response =>{
        //console.log(response);
        this.contacto =response;
      }
      )
    }
    
  onSubmit(f: NgForm) {
    // console.log(this.editForm.value);
     console.log(f.form.value);
     const url = 'http://localhost:8080/contactos/crear';
     this.httpClient.post(url, f.value)
       .subscribe((result) => {
        this.ngOnInit(); 
    });
     this.modalService.dismissAll(); 
  }


  openEdit(targetModal, contacto:Contacto) {
    this.modalService.open(targetModal, {
      centered: false,
      backdrop: 'static',
    });
    this.editForm.patchValue( {
      id: contacto.id,
      mail_contacto: contacto.mail_contacto,
      github_url: contacto.github_url,
      linkedin_url: contacto.linkedin_url,
    });
  }
  
  

  onSave() {

    console.log(this.editForm.value);
    const editURL = 'http://localhost:8080/contactos/' + 'editar/'  + this.editForm.value.id ;
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, contacto:Contacto) {
    console.log(this.deleteId);
    console.log(contacto.id);
    this.deleteId = contacto.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/contactos/' +  'borrar/'+ this.deleteId ;
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


