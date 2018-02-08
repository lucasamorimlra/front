import { Component, EventEmitter } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { AuthService } from '../../components/principal/login/auth.service';
@Component({
	selector: 'menuSuperior',
	templateUrl: './menu-superior.html',
	styleUrls: ['./menu-superior.css']
})



export class MenuSuperiorComponent {

	mostrarMenuEmmiter = new EventEmitter<boolean>();
	constructor(private router: Router, private sessionSt: SessionStorageService, private authService: AuthService) {

	}
	fazerLogOut() {
		this.authService.fazerLogOut();
		
	}
}