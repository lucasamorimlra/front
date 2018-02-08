
import { Component } from '@angular/core';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
    templateUrl: './empresa-listar.html',
    styleUrls: ['./empresa-listar.css']
})

export class EmpresaListar implements OnInit {
    private filtroNmeEmpresa: string = "";
    empresas: Empresa[];
    empresasFiltradas: Empresa[];
    logosMap: Map<number, string> = new Map<number, string>();

    constructor(private service: EmpresaService,
        private route: ActivatedRoute,
        private router: Router) {
    }
    ngOnInit(): void {
        this.filtrarEmpresas();
    }

    filtrarEmpresas() {
        this.empresas = new Array<Empresa>();
        this.service.listarTodasEmpresas().then(
            data => data.forEach(empresa => {
                this.service.consultarLogoPorId(empresa.id).then(
                    data => {
                        this.logosMap.set(empresa.id, data.fileAsBase64);
                    }
                ).catch(error => { });
                this.empresas.push(new Empresa(
                    empresa.id,
                    empresa.numCnpj,
                    empresa.nmeEmpresa,
                    empresa.sglEmpresa,
                    empresa.codSiest,
                    empresa.urlDominio));
            }));
        this.empresasFiltradas = this.empresas;
    }
    getEmpresaPorNome() {
        this.empresasFiltradas = new Array<Empresa>();
        this.empresas.forEach(empresa => {
            if (empresa.nmeEmpresa.toUpperCase().includes(this.filtroNmeEmpresa.toUpperCase()))
                this.empresasFiltradas.push(empresa);
        });

    }
    getBackgroundImage(i: number) {
        const imgAsBase64 = this.logosMap.get(this.empresas[i].id);
        let styleWithImage = {
            'background-image': "url('data:image/png;base64," + imgAsBase64 + "')",
            'background-size': "contain",
            'background-repeat': "no-repeat",
            'background-position': 'center',
            'background-color': 'ffffff'
        };
        return styleWithImage;
    }
    selecionar(empresa: Empresa) {
        let url = '/empresa/' + empresa.id + "/gestao";
        this.router.navigate([url]);
    }
    chamarModalExcluir(empresa: Empresa) {
        this.router.navigate(['/empresa/excluir', empresa.id]);
    }

}








