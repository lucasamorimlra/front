import { Component, OnChanges, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VagaService } from '../../../services/vaga.service';
import { PessoaService } from '../../../services/pessoa.service'

@Component({
    templateUrl: '/membros.excluir.component.html',
    styleUrls: ['../editar/membros.component.css']
})

export class MembrosExcluir {

	nomeMembro: string;
	cargoMembro: string;
	
    constructor(
        private route: ActivatedRoute,
        private	vagService: VagaService,
        private servicePessoa: PessoaService,
        private router: Router, private location: Location ) {
    }

    ngOnInit(): void {
     
    	this.nomeMembro = this.vagService.getNome();
    	this.cargoMembro = this.vagService.getCargo();
    }

    darBaixaMembro()
    {
    	let segments = this.router.url.split('/');

           this.vagService.consultarVagaCompleta(segments[4]).then(data => {
                    data.taMembroOcupaVagas.forEach((obj) => {
                        if(obj.tbVaga.id == segments[6])
                        {
                	        this.servicePessoa.removePessoaVaga(JSON.parse('{"id":'+obj.id+'}'));
						  	this.fecharModal();
                        }
                    });
                });
    }

   fecharModal() {
        this.location.back();

    }
  
}

