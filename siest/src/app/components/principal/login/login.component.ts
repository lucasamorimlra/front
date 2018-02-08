import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

import { AuthService } from './auth.service';
import { Pessoa } from '../../../models/pessoa';



@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


export class Login implements OnInit {
    formPessoa: FormGroup;

    pessoa: Pessoa = new Pessoa();


    constructor(private router: Router, private location: Location, private fb: FormBuilder, private authService: AuthService) {
    }
    ngOnInit(): void {
        this.formPessoa = this.fb.group({
            numCpf: new FormControl("", [Validators.required]),
            senha: new FormControl("", [Validators.required]),
        });
    }
    fazerLogin() {
        console.log(this.formPessoa.controls.numCpf.value);
        this.authService.fazerLogin(this.formPessoa.controls.numCpf.value, this.formPessoa.controls.senha.value);

    }

}
