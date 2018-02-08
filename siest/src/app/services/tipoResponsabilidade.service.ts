import { Injectable } from '@angular/core';

import { ServerRequest } from '../helpers/serverRequest';
import { TipoResponsabilidade } from '../models/tipoResponsabilidade';


@Injectable()
export class TipoResponsabilidadeService {
    tiposResponsabilidade: TipoResponsabilidade[];
    tipoResponsabilidade: TipoResponsabilidade;

    constructor(private serverRq: ServerRequest) {

    }
    consultarTiposResponsabilidade() {
        return this.serverRq.consultar('tipo-responsabilidade/');
    }
    consultarTiposResponsabilidadePorId(id) {
        return this.serverRq.consultar("tipo-responsabilidade/" + id);
    }
    carregarTiposResponsabilidade(response) {
        this.tiposResponsabilidade = new Array<TipoResponsabilidade>();
        response.forEach(tipoResponsabilidade => {
            this.tiposResponsabilidade.push(new TipoResponsabilidade(
                tipoResponsabilidade.id,
                tipoResponsabilidade.nmeTipoResponsabilidade
            ));
        });
        return this.tiposResponsabilidade;
    }
    carregarTipoResponsabilidade(response) {

        response.forEach(tipoResponsabilidade => {
            this.tipoResponsabilidade = new TipoResponsabilidade(
                tipoResponsabilidade.id,
                tipoResponsabilidade.nmeTipoResponsabilidade,

            );
            return this.tipoResponsabilidade;
        });

    }
}