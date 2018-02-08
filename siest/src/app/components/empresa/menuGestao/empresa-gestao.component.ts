
import { Component } from '@angular/core';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { EntidadeGestora } from '../../../models/entidadeGestora';
import { EntidadeGestoraService } from '../../../services/entidadeGestora.service';

@Component({
    templateUrl: './empresa-gestao.html',
    styleUrls: ['./empresa-gestao.css']
})

export class EmpresaGestao implements OnInit {
    private selecionadoID: number;
    private numeroDeComites: number;
    private numeroDeDiretorias: number;
    private numeroDeConselhos: number;
    empresa: Empresa;
    entidadesGestoras: EntidadeGestora[];
    constructor(private serviceEmpresa: EmpresaService,
        private serviceEntidadeGestora: EntidadeGestoraService,
        private route: ActivatedRoute,
        private router: Router) {

    }
    ngOnInit(): void {

        let indexOf = this.router.url.replace("/empresa/", "").indexOf("/");
        this.selecionadoID = +this.router.url.replace("/empresa/", "").substr(0, indexOf);
        this.serviceEmpresa.consultarEmpresaPorId(this.selecionadoID).then(data => {
            this.empresa = this.serviceEmpresa.carregarEmpresa(data);
        })
        this.serviceEmpresa.consultarEntidadesGestorasPorIdEmpresa(this.selecionadoID).then(data => {
            if (data !== []) {
                this.numeroDeComites = data["comites"];
                this.numeroDeConselhos = (+data["conselhosAdministrativos"] + +data["conselhosFiscais"])
                this.numeroDeDiretorias = data["diretorias"];
            }
        })
        this.serviceEntidadeGestora.consultarEntidadeGestoraPorIdEmpresa(this.selecionadoID).then(data => {
            if (data !== []) {
                this.entidadesGestoras = this.serviceEntidadeGestora.carregarEntidadesGestoras(data);
            }
        })
    }

    voltar() {
        this.router.navigate(['/empresa', this.selecionadoID]);
    }

    abreRemuneracao(entidadeId)
    {
        this.router.navigate(['empresa/'+this.empresa.id+'/entidadeGestora/'+entidadeId, "remuneracao"]);
    }


}








