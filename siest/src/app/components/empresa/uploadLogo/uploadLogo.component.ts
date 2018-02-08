import { Component } from '@angular/core';
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../models/empresa'

@Component({
    templateUrl: './uploadLogo.html',
    styleUrls: ['./uploadLogo.css']
})

export class UploadLogo {
    private selecionadoID: number;
    private empresa: Empresa;

    constructor(private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private service: EmpresaService) {
        this.criarFormulario();
    }

    criarFormulario(): void {
        let parameters = this.router.url.split("/");
        this.selecionadoID = +parameters[2];

        this.service.consultarEmpresaPorId(this.selecionadoID).then(data => {
            this.empresa = this.service.carregarEmpresa(data);
        });

    }
    ngOnInit(): void {
        const me = this;
    }
    ngAfterViewInit(): void {
    }
    addOptions(event): void {

        event[2].append('dscDocumento', "sample");
        event[2].append('fkTipoDoc', "8");
        event[2].append('nmeDocumentoOriginal', event[0].name);
        event[2].append('fkMetaEntidade', 1);
        event[2].append('fkEntidade', this.selecionadoID);

    }

    onUploadError(event): void {
    }

    onUploadSuccess(event): void {
        this.service.setRandomInt(event[1].id);
        this.location.back();
    }

    voltar() {
        this.location.back();
    }
}


