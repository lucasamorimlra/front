import { Injectable } from '@angular/core';
import { TipoGestao } from '../models/tipoGestao';
import { ServerRequest } from '../helpers/serverRequest';


@Injectable()
export class TipoGestaoService {
    tiposGestao: TipoGestao[];
    tipoGestao: TipoGestao;

    constructor(private serverRq: ServerRequest) {

    }

    listarTiposGestaoDisponiveisPorEmpresa(fkEmpresa) {
        return this.serverRq.consultar('empresa/getentitiesleft?fk_emp=' + fkEmpresa);
    }
    consultarTipoGestaoPorId(id) {
        return this.serverRq.consultar("tipo-gestao/" + id);
    }
    carregarTiposGestao(response) {
        this.tiposGestao = new Array<TipoGestao>();
        response.forEach(tipoGestao => {
            this.tiposGestao.push(new TipoGestao(
                tipoGestao.id,
                tipoGestao.nmeTipoGestao,
                tipoGestao.alsTipoGestao
            ));
        });
        return this.tiposGestao;
    }
    carregarTipoGestao(response) {

        response.forEach(tipoGestao => {
            this.tipoGestao = new TipoGestao(
                tipoGestao.id,
                tipoGestao.nmeTipoGestao,
                tipoGestao.alsTipoGestao
            );
        });
        return this.tipoGestao;
    }
}