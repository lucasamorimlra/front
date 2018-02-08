import { Injectable } from '@angular/core';
import { TipoDocumento } from '../models/tipoDocumento';
import { ServerRequest } from '../helpers/serverRequest';


@Injectable()
export class TipoDocumentoService {
    tiposDocumento: TipoDocumento[];
    tipoDocumento: TipoDocumento;
    idTipoSelecionado: number;
    constructor(private serverRq: ServerRequest) {

    }
    listarTiposDocumentos() {
        return this.serverRq.consultar('tipo-documento/');
    }
    consultarTipoDocumentoPorId(id) {
        return this.serverRq.consultar("tipoDocumento/" + id);
    }
    carregarTiposDocumento(response) {
        this.tiposDocumento = new Array<TipoDocumento>();
        response.forEach(tipoDocumento => {
            this.tiposDocumento.push(new TipoDocumento(
                tipoDocumento.id,
                tipoDocumento.nmeTipoDocumento
            ));
        });
        return this.tiposDocumento;
    }
    carregarTipoDocumento(response) {

        response.forEach(tipoDocumento => {
            this.tipoDocumento = new TipoDocumento(
                tipoDocumento.id,
                tipoDocumento.nmeTipoDocumento
            );
        });
        return this.tipoDocumento;
    }
}