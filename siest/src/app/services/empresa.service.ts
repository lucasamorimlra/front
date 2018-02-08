
import { Injectable } from '@angular/core';

import { ServerRequest } from '../helpers/serverRequest';

import { Empresa } from '../models/empresa';
@Injectable()
export class EmpresaService {

    empresa: Empresa;

    empresaRegister: Empresa;
    randomInt: Number;

    getRandomInt() {
        return this.randomInt;
    }

    setRandomInt(rand: Number) {
        this.randomInt = rand;
    }

    constructor(private serverRq: ServerRequest) {

    }
    listarTodasEmpresas() {
        return this.serverRq.consultar("empresa/");
    }
    consultarEmpresaPorId(id) {
        return this.serverRq.consultar(`empresa/${id}`);
    }
    consultarLogoPorId(id) {
        return this.serverRq.consultar(`empresa/consultarLogo/${id}`);
    }
    cadastrarEmpresa(json: JSON) {
        return this.serverRq.cadastrar("empresa/", json);
    }
    consultarEntidadesGestorasPorIdEmpresa(id) {
        return this.serverRq.consultar(`empresa/quant/entidadesGestoras/${id}`);
    }
    atualizarEmpresa(json: JSON) {
        return this.serverRq.atualizar("empresa/", json);
    }
    deletarEmpresa(id) {
        return this.serverRq.deletar(`empresa/${id}`);
    }
    consultarSegmentosInformacaoEmp(id) {
        return this.serverRq.consultar(`empresa/consultaSegmentoInfo/${id}`);
    }


    carregarEmpresa(response) {

        this.empresa = new Empresa(
            response.id,
            response.numCnpj,
            response.nmeEmpresa,
            response.sglEmpresa,
            response.codSiest,
            response.urlDominio
        );
        return this.empresa;
    }
}
