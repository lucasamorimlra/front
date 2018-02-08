
import { Component } from '@angular/core';
import { Empresa } from '../../../models/empresa';
import { TipoDocumento } from '../../../models/tipoDocumento';
import { Documento } from '../../../models/documento';
import { EmpresaService } from '../../../services/empresa.service';
import { TipoDocumentoService } from '../../../services/tipoDocumento.service';
import { DocumentoService } from '../../../services/documento.service';
import { MetaEntidadeDocumentoService } from '../../../services/metaEntidadeDocumento.service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';


@Component({
    templateUrl: './empresa-documentos.html',
    styleUrls: ['./empresa-documentos.css']
})

export class EmpresaDocumentos implements OnInit {
    private selecionadoID: number;
    empresa: Empresa;
    tiposDocumento: Array<TipoDocumento>;
    idTipoDocumento: number;
    documentos: Array<Documento>;
    carregando: boolean;
    constructor(private serviceEmpresa: EmpresaService,
        private route: ActivatedRoute,
        private tipoDocumentoService: TipoDocumentoService,
        private router: Router,
        private documentoService: DocumentoService,
        private metaEntidadeDocumentoService: MetaEntidadeDocumentoService) {
        this.idTipoDocumento = 0;
        this.carregando = false;
    }
    ngOnInit(): void {
        let parameters = this.router.url.split("/");
        this.selecionadoID = +parameters[2];
        this.serviceEmpresa.consultarEmpresaPorId(this.selecionadoID).then(data => {
            this.empresa = this.serviceEmpresa.carregarEmpresa(data);
        });
        this.tipoDocumentoService.listarTiposDocumentos().then(data => {
            this.tiposDocumento = this.tipoDocumentoService.carregarTiposDocumento(data);
        });
    }

    voltar() {
        this.router.navigate(['/empresa', this.selecionadoID]);
    }
    selecionarTipoDocumento(id) {
        this.documentos = [];
        this.idTipoDocumento = id;
        if (this.carregando == false) {
            this.carregando = true;
            this.metaEntidadeDocumentoService.consultarMetaEntidadeDocumentoPoridEntidade(this.selecionadoID).then(data => {
                if (JSON.stringify(data) !== JSON.stringify({})) {
                    console.log(data);
                    data.forEach(element => {
                        this.documentoService.listarDocumentosPorTipoDocumentoeId(id, element.tbDocumento.id).then(data => {
                            if (JSON.stringify(data) !== JSON.stringify({})) {
                                data.forEach(documento => {
                                    this.documentos.push(new Documento(
                                        documento.id,
                                        documento.dscDocumento,
                                        documento.nmeDocumentoOriginal,
                                    ));
                                });
                            }
                            this.carregando = false;
                        })
                    });
                }
            });
        }
    }
    testeDocumentos() {
        if (this.documentos) {
            if (this.documentos.length > 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }

    }
    telaUploadDocumento(id) {
        let url = this.router.url + '/upload/' + id
        this.router.navigate([url]);
    }
    downloadDocumento(id) {
        this.documentoService.downloadDocumento(id);
    }
    deletarDocumento(id) {

        this.metaEntidadeDocumentoService.deletarMetaEntidade(id).then(data => {


            this.documentoService.deletarDocumento(id).then(data => {
                this.selecionarTipoDocumento(this.idTipoDocumento);
            });
        })

    }

}








