import { Injectable } from '@angular/core';
import { Vaga } from '../models/vaga';
import { Indicante } from '../models/indicante';
import { Cargo } from '../models/cargo';
import { EntidadeGestora } from '../models/entidadeGestora';
import { ServerRequest } from '../helpers/serverRequest';

@Injectable()
export class VagaService {
    vagas: Array<Vaga>;
    vaga: Vaga;
    nomeMembro: string;
    cargoMembro: string;
    constructor(private serverRq: ServerRequest) {

    }
    listarVagas(fkEmpresa: string) {
        return this.serverRq.consultar('vagas/list?fk_emp=' + fkEmpresa);
    }
    consultarVagaPorIdEntidade(id) {
        return this.serverRq.consultar("vaga/" + id);
    }
    cadastrarVaga(json: JSON) {
        return this.serverRq.cadastrar("vaga/", json);
    }
    atualizarVaga(json: JSON) {
        return this.serverRq.atualizar("vaga/", json);
    }
    excluirVaga(id) {
        return this.serverRq.deletar(`vaga/${id}`);
    }
    consultarVagaCompleta(id) {
        return this.serverRq.consultar("entidadegestora/list/complete?id=" + id);
    }
    consultarVagaCompletaList(id) {
        return this.serverRq.consultar("vaga/list/complete?fk_ges=" + id + "&orderby=id&asc");
    }


    //criar um service pra isso depois
    consultarRemuneracao(id) {
        return this.serverRq.consultar("remuneracao/list/3?fk_mem_ocu_vag=" + id);
    }

    //pra isso também
    consultarRemuneracaoData(id, data) {
        return this.serverRq.consultar("remuneracao/list/?fk_mem_ocu_vag=" + id + "&dtaRemuneracao=" + data);
    }

    consultarUltimaRemuneracao(id) {
        return this.serverRq.consultar("remuneracao/list/1/?fk_mem_ocu_vag=" + id);
    }

    //já sabe né
    atualizaRemuneracao(json: JSON) {
        return this.serverRq.atualizar("remuneracao/", json);
    }

    //...
    cadastraRemuneracao(json: JSON) {
        return this.serverRq.cadastrar("remuneracao/", json);
    }

    setNomeCargo(nome, cargo) {
        this.nomeMembro = nome;
        this.cargoMembro = cargo;
    }

    getCargo() {
        return this.cargoMembro;
    }

    getNome() {
        return this.nomeMembro;
    }

    carregarVagas(response) {
        this.vagas = new Array<Vaga>();
        response.forEach(vaga => {
            this.vagas.push(new Vaga(
                vaga.id,
                vaga.vlrRemuneracaoBase,
                vaga.dscVaga,
                vaga.tipoVaga,
                vaga.nroVaga,
                vaga.dtaInicio,
                vaga.dtaFim,
                new EntidadeGestora()
                ,
                new Indicante()
                , new Cargo(vaga.tdCargo.id, vaga.tdCargo.nmeCargo)
            ));
        });
        return this.vagas;
    }

    carregaVaga(response) {

        response.forEach(vaga => {
            this.vaga = (new Vaga(
                vaga.id,
                vaga.vlrRemuneracaoBase,
                vaga.dscVaga,
                vaga.tipoVaga,
                vaga.nroVaga,
                vaga.dtaInicio,
                vaga.dtaFim,
                new EntidadeGestora()
                ,
                new Indicante()
                , new Cargo(vaga.tdCargo.id, vaga.tdCargo.nmeCargo)
            ));
            return this.vaga;
        });
        return null;
    }
}
