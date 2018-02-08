import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/auth.service';




@Component({
  selector: 'app',
  templateUrl: './principal.html',
  styleUrls: ['./principal.css']
})

export class AppSiest implements OnInit {
  ngOnInit(): void {
    this.authService.mostrarMenuEmmiter.subscribe(
      mostrar => this.mostrarMenu = mostrar

    );
    console.log(this.mostrarMenu);
  }
  title = 'Novo SIEST - Sistema de Informação das Estatais';

  mostrarMenu: boolean = false;

  constructor(private authService: AuthService) {
  }
}
