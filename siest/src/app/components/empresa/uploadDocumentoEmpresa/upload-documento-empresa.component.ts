import { Component } from '@angular/core';
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../models/empresa';
import { TipoDocumentoService } from '../../../services/tipoDocumento.service';
import { TipoDocumento } from '../../../models/tipoDocumento';

@Component({
    templateUrl: './upload-documento-empresa.html',
    styleUrls: ['./upload-documento-empresa.css']
})


export class UploadDocumentoEmpresa {
    private selecionadoID: number;
    private empresa: Empresa;
    private tipoDocumentoId: number;
    private tipoDocumento: TipoDocumento;
    constructor(private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private service: EmpresaService, private tipoDocumentoService: TipoDocumentoService) {
        this.ngOnInit();
    }
    ngOnInit(): void {

        const me = this;

        let parameters = this.router.url.split("/");
        this.selecionadoID = +parameters[2];
        this.tipoDocumentoId = +parameters[5];
        this.service.consultarEmpresaPorId(this.selecionadoID).then(data => {
            this.empresa = this.service.carregarEmpresa(data);
        });
        this.tipoDocumentoService.consultarTipoDocumentoPorId(this.tipoDocumentoId).then(data => {
            this.tipoDocumento = this.tipoDocumentoService.carregarTipoDocumento(data);
        });
    }
    ngAfterViewInit(): void {

    }
    addOptions(event): void {
        event[2].append('dscDocumento', "");
        event[2].append('fkTipoDoc', this.tipoDocumentoId);
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


