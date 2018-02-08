import { EntidadeGestora } from '../models/entidadeGestora';
import { TipoGestao } from '../models/tipoGestao';
import { Injectable } from '@angular/core';
import { ServerRequest } from '../helpers/serverRequest';
let entidadesGestoras = [
];

@Injectable()
export class EntidadeGestoraService {
    entidadesGestoras: EntidadeGestora[];
    entidadeGestora: EntidadeGestora;
    constructor(private serverRq: ServerRequest) {
    }
    cadastrarEntidadeGestora(json: JSON) {
        return this.serverRq.cadastrar("entidade-gestora/", json);
    }
    consultarEntidadeGestoraPorIdEmpresa(id) {
        return this.serverRq.consultar("entidade-gestora/list?fk_emp=" + id);
    }
    consultarEntidadeGestoraPorId(id) {
        return this.serverRq.consultar("entidadeGestora/" + id);
    }
    deletarEntidadeGestora(id) {
        return this.serverRq.deletar(`entidade-gestora/${id}`);
    }
    atualizarEntidadeGestora(json: JSON) {
        return this.serverRq.atualizar("entidade-gestora/", json);
    }
    carregarEntidadesGestoras(response) {
        entidadesGestoras = new Array<EntidadeGestora>();
        response.forEach(entidadeGestora => {
            entidadesGestoras.push(new EntidadeGestora(
                entidadeGestora.id,
                entidadeGestora.numVagasTitular,
                entidadeGestora.numSuplentes,
                entidadeGestora.numRecond,
                entidadeGestora.vlrRemuneracaoBase,
                entidadeGestora.stsMandatoUnificado,
                entidadeGestora.lclReuniao,
                entidadeGestora.rnuPeriodicidade,
                new TipoGestao(
                    entidadeGestora.tdTipoGestao.id,
                    entidadeGestora.tdTipoGestao.nmeTipoGestao,
                    entidadeGestora.tdTipoGestao.alsTipoGestao,
                ),
                entidadeGestora.dtaInicio,
                entidadeGestora.dtaFim,
            ));
        });
        return entidadesGestoras;
    }
    carregarEntidadeGestora(response) {

        response.forEach(entidadeGestora => {
            this.entidadeGestora = new EntidadeGestora(
                entidadeGestora.id,
                entidadeGestora.numVagasTitular,
                entidadeGestora.numSuplentes,
                entidadeGestora.numRecond,
                entidadeGestora.vlrRemuneracaoBase,
                entidadeGestora.stsMandatoUnificado,
                entidadeGestora.lclReuniao,
                entidadeGestora.rnuPeriodicidade,
                new TipoGestao(
                    entidadeGestora.tdTipoGestao.id,
                    entidadeGestora.tdTipoGestao.nmeTipoGestao,
                    entidadeGestora.tdTipoGestao.alsTipoGestao,
                ),
                entidadeGestora.dtaInicio,
                entidadeGestora.dtaFim
            );
        });
        return this.entidadeGestora;
    }
}
