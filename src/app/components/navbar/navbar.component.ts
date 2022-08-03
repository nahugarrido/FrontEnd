import { Component, OnInit, ViewChild } from '@angular/core';
import { Contacto, LoginUsuario } from '../../models/index';
import {
  ContactoService,
  AuthService,
  TokenService,
} from '../../services/index';
import {
  NgbModalConfig,
  NgbModal,
  ModalDismissReasons,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  contacto: Contacto[] = [];
  isLogged = false;
  isLoginFail: boolean;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  closeResult: string;
  mensajeError: string;

  @ViewChild('Fail', { static: false }) Fail: NgbModalRef;

  constructor(
    public contactoService: ContactoService,
    private modalService: NgbModal,
    public httpClient: HttpClient,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.contactoService.getContacto().subscribe((data) => {
      this.contacto = data;
    });
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(f: NgForm) {
    this.loginUsuario = new LoginUsuario(
      f.form.value.nombreUsuario,
      f.form.value.password
    );
    console.log(this.loginUsuario);
    this.isLoginFail = true;
    this.authService.login(this.loginUsuario).subscribe(
      (data) => {
        this.isLoginFail = false;
        console.log('this.isLoginFail adentro de data:', this.isLoginFail);
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        window.location.reload();
      },
      (err) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.onLogInFail();
      }
    );
  }

  onLogInFail2(value): void {
    if (value) {
      this.open(this.Fail);
    }
  }

  onLogInFail(): void {
    if (this.isLoginFail) {
      this.open(this.Fail);
    }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
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
