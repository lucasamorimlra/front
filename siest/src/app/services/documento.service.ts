import { Injectable } from '@angular/core';
import { Documento } from '../models/documento';
import { ServerRequest } from '../helpers/serverRequest';


@Injectable()
export class DocumentoService {
    documentos: Documento[];
    documento: Documento;
    constructor(private serverRq: ServerRequest) {

    }
    listarDocumentos() {
        return this.serverRq.consultar('documento/list');
    }
    listarDocumentosPorTipoDocumento(tipDoc) {
        return this.serverRq.consultar('documento/list?fk_tip_doc=' + tipDoc);
    }
    listarDocumentosPorTipoDocumentoeId(tipDoc, id) {
        return this.serverRq.consultar('documento/list?fk_tip_doc=' + tipDoc + '&id=' + id);
    }
    downloadDocumento(id) {
        return this.serverRq.download('documento/download?id=' + id);
    }
    consultarDocumentoPorId(id) {
        return this.serverRq.consultar("documento/list?id=" + id);
    }
    deletarDocumento(id) {
        return this.serverRq.deletar(`documento/${id}`);
    }
    cadastrarDocumento(json: JSON) {
        return this.serverRq.cadastrar("documento", json);
    }

    carregarDocumentos(response) {
        this.documentos = new Array<Documento>();
        response.forEach(documento => {
            this.documentos.push(new Documento(
                documento.id,
                documento.dscDocumento,
                documento.nmeDocumentoOriginal,
            ));
        });
        return this.documentos;
    }

    carregarDocumento(response) {
        response.forEach(documento => {
            this.documento = (new Documento(
                documento.id,
                documento.dscDocumento,
                documento.nmeDocumentoOriginal,
            ));
            return this.documento;
        });
        return null;
    }


}