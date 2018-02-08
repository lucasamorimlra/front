import { Injectable } from '@angular/core';
import { MetaEntidadeDocumento } from '../models/metaEntidadeDocumento';
import { ServerRequest } from '../helpers/serverRequest';


@Injectable()
export class MetaEntidadeDocumentoService {
    MetaEntidades: MetaEntidadeDocumento[];
    MetaEntidade: MetaEntidadeDocumento;
    constructor(private serverRq: ServerRequest) {

    }
    listarMetaEntidadesDocumento() {
        return this.serverRq.consultar('meta-entidade-documento/');
    }
    consultarMetaEntidadeDocumentoPoridEntidade(id) {
        return this.serverRq.consultar(`meta-entidade-documento/${id}`);
    }
    deletarMetaEntidade(id) {
        return this.serverRq.deletar(`meta-entidade-documento/${id}`);
    }

}