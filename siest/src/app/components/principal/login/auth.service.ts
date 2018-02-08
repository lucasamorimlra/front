import { Injectable } from '@angular/core';
import { Pessoa } from '../../../models/pessoa';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core/';
import { FormGroup } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
@Injectable()
export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmmiter = new EventEmitter<boolean>();
  loginForm: FormGroup;
  constructor(private router: Router, private sessionSt: SessionStorageService) { }

  fazerLogin(cpf: String, senha: String) {
    this.sessionSt.clear("token")
    if (cpf === 'admin' && senha == 'admin') {
      this.usuarioAutenticado = true;
      this.mostrarMenuEmmiter.emit(true);
      this.sessionSt.store("token", "123");
      this.router.navigate(['/home']);
    }
    else {
      this.usuarioAutenticado = false;
      this.mostrarMenuEmmiter.emit(false);
    }
  }
  usuarioEstaAutenticado() {

    let token = this.sessionSt.retrieve("token");

    if (token) {
      this.usuarioAutenticado = true;
      this.mostrarMenuEmmiter.emit(true);
    }
    return this.usuarioAutenticado;
  }
  fazerLogOut() {
    this.sessionSt.clear("token");
    this.mostrarMenuEmmiter.emit(false);
    this.router.navigate(['/login']);
  }
}

