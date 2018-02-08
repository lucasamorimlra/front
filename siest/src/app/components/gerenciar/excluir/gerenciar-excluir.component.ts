
import { Component, OnChanges, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { Pessoa } from '../../../models/pessoa';
import { PessoaService }  from '../../../services/pessoa.service'
import { CpfValidator } from '../../../diretivas/validacaoCpf.directive';

@Component({
    templateUrl: './gerenciar-excluir.html' 
})

export class GerenciarExcluir { 
    
    @Input() pessoa: Pessoa;
    msgErro: string;
    idSelecionado: number;
    constructor( 
        private service: PessoaService,
        private route: ActivatedRoute, 
        private router: Router, 
        private location: Location,
        ) { }
    ngOnInit() {
       
    }

    excluir(){
        const id = +this.router.url.replace("/gerenciar/", "").replace("/excluir", "");

        this.service.deletarPessoa(this.idSelecionado).then(
            response => {
                if (response["code"] && response["code"] === 200){
                    this.router.navigate(["/gerenciar"]);
                }
            }
        );
    }
    fecharModal() {
        this.location.back();
    }
    voltar() {
        this.location.back();
    }

}








