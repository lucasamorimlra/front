
import { Component } from '@angular/core';
import { EntidadeGestora } from '../../../models/entidadeGestora';
import { EntidadeGestoraService } from '../../../services/entidadeGestora.service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
@Component({
    templateUrl: './entidadeGestora-excluir.html'

})

export class EntidadeGestoraExcluir implements OnInit {
    entidadeGestora: EntidadeGestora;
    selecionadoID: number;
    mensagem: string;

    constructor(
        private service: EntidadeGestoraService,
        private route: ActivatedRoute,
        private router: Router, private location: Location) {
    }
    ngOnInit(): void {

        this.route.params.subscribe(params => {
            this.selecionadoID = +params['id'];
            if (this.selecionadoID !== 0 && this.selecionadoID !== undefined) {
                this.service.consultarEntidadeGestoraPorId(this.selecionadoID).then(data => {
                    if (data !== []) {
                        this.entidadeGestora = this.service.carregarEntidadeGestora(data);
                        
                    }
                })
            }
        });
    }
    fecharModal() {
        this.location.back();

    }
    excluirEntidadeGestora() {
   
        this.service.deletarEntidadeGestora( this.selecionadoID).then(data => {
            if (data["code"] == "200") {
                this.router.navigate(['/empresa']);
            } else {
                this.mensagem = "Não Foi possivel deletar a Entidade Gestora";
            }
        });
    }
}








