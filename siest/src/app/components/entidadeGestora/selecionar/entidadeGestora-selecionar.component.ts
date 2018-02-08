
import { Component } from '@angular/core';
import { EntidadeGestora } from '../../../models/entidadeGestora';
import { EntidadeGestoraService } from '../../../services/entidadeGestora.service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { Vaga } from '../../../models/vaga';
import { VagaService } from '../../../services/vaga.service';

@Component({
    templateUrl: './entidadeGestora-selecionar.html'

})

export class EntidadeGestoraSelecionar implements OnInit {
    entidadeGestora: EntidadeGestora;
    vagas: Array<Vaga>;
    vagasComplete: Array<any>;
    selecionadoID: number;
    mensagem: string;
    nomeMembro: string;
    cargoMembro: string;
    idEmpresa: number;
    constructor(
        private service: EntidadeGestoraService,
        private route: ActivatedRoute,
        private router: Router, private location: Location, private vagService: VagaService) {
    }
    ngOnInit(): void {
        let segments = this.router.url.split('/');
        this.idEmpresa = +segments[2];
        this.route.params.subscribe(params => {
            this.selecionadoID = +params['id'];
            if (this.selecionadoID !== 0 && this.selecionadoID !== undefined) {
                this.service.consultarEntidadeGestoraPorId(this.selecionadoID).then(data => {
                    if (data !== []) {
                        this.entidadeGestora = this.service.carregarEntidadeGestora(data);
                    }
                })
                this.vagService.consultarVagaPorIdEntidade(this.selecionadoID).then(data => {
                    this.vagas = this.vagService.carregarVagas(data);
                    console.log(this.vagas);
                })
                this.vagService.consultarVagaCompleta(this.selecionadoID).then(data => {
                    this.vagasComplete = [];
                    data.taMembroOcupaVagas.forEach((obj) => {
                        this.vagasComplete[obj.tbVaga.id] = obj.tbPessoa.nmePessoa;
                    });
                });
            }
        });
    }

    excluirMembro(id: number,nome: string, cargo: string)
    {
         this.vagService.setNomeCargo(nome,cargo);
         this.router.navigate(['empresa/'+this.idEmpresa+'/entidadeGestora/'+this.entidadeGestora.id+'/membro', id, "excluir"]);
    }

    selecionaNomeMembro(id: number) {
        if (typeof this.vagasComplete[id] != 'undefined') {
            return this.vagasComplete[id];
        }
        else {
            return "Vazia";
        }
    }

    remuneracaoBase() {
        if (this.entidadeGestora.vlrRemuneracaoBase) {
            return (this.entidadeGestora.vlrRemuneracaoBase + "").replace(".", ",");
        }
        return "0,00";
    }
    voltar() {
        this.location.back();
    }



}








