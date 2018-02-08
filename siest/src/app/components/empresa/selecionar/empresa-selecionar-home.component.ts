import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    template: '<div class="voltar" (click)="voltar()"></div>'
})
export class EmpresaSelecionarHome {

    constructor(private router: Router) {

    }


    voltar() {
        this.router.navigate(['/empresa']);
    }

}