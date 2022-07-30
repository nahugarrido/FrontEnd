import { Component, ElementRef, OnInit, ViewChild, ɵViewRef } from '@angular/core';
import { Contacto } from '../model/contacto.model';
import { ContactoService } from '../service/contacto.service';
import { LoginUsuario } from '../model/login.model';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { NgbModalConfig,NgbModal,ModalDismissReasons, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  contacto: Contacto[] = [];
  isLogged= false;
  isLoginFail= false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  closeResult: string;

  @ViewChild('Fail', {static: false}) Fail: NgbModalRef;

  constructor(public contactoService: ContactoService, config: NgbModalConfig, 
    private modalService: NgbModal,
    private fb: FormBuilder,
    public httpClient:HttpClient, private tokenService: TokenService,private authService: AuthService) { }

  ngOnInit() {
    this.contactoService.getContacto().subscribe(data => {this.contacto = data})
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

    
  }
  
  onLogin(f: NgForm){
    this.loginUsuario = new LoginUsuario(f.form.value.nombreUsuario, f.form.value.password);
    console.log(this.loginUsuario);
    this.isLoginFail = true;
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLoginFail = false;
        console.log("this.isLoginFail adentro de data:", this.isLoginFail);
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        //window.location.reload(); /// recarga la pagina
      },
      );
      
    }

    onLogInFail(): void {
      if(this.isLoginFail)
      {
        this.open(this.Fail);
      }
    }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
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