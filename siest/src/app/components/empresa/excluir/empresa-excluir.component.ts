
import { Component } from '@angular/core';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    templateUrl: './empresa-excluir.html',
    styleUrls: ['./empresa-excluir.css']
})



export class EmpresaExcluir implements OnInit {
    empresa: Empresa;
    selecionadoID: number;
    mensagem: string;

    constructor(private service: EmpresaService,
        private route: ActivatedRoute,
        private router: Router) {
    }
    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.selecionadoID = +params['id'];
            if (this.selecionadoID !== 0 && this.selecionadoID !== undefined) {
                this.service.consultarEmpresaPorId(this.selecionadoID).then(data => {
                    if (data !== []) {
                        this.empresa = this.service.carregarEmpresa(data);
                    }
                })
            }
        });
    }
    fecharModal() {
        this.router.navigate(['/empresa']);
    }
    excluirEmpresa() {

        this.service.deletarEmpresa(this.selecionadoID).then(data => {

            this.router.navigate(['/empresa']);

        });
    }
}








