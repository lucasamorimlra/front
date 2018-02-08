import { Injectable } from '@angular/core';

import { ServerRequest } from '../helpers/serverRequest';
import { ResponsavelAtualizacao } from '../models/responsavelAtualizacao';
import { Empresa } from '../models/empresa';
import { SegmentoInformacao } from '../models/segmentoInformacao';
import { TipoResponsabilidade } from '../models/tipoResponsabilidade';
import { Pessoa } from '../models/pessoa';


@Injectable()
export class ResponsavelAtualizacaoService {
    responsaveisAtualizacao: ResponsavelAtualizacao[];
    responsavelAtualizacao: ResponsavelAtualizacao;
    constructor(private serverRq: ServerRequest) {

    }
    consultarResponsavelAtualizacaoPorId(id) { 
        return this.serverRq.consultar('respAtualizacao/' + id);
    }
    listarResponsavelAtualizacaoPorEmpresa(idEmpresa) {
        return this.serverRq.consultar('resp-atualizacao/list?fk_emp=' + idEmpresa + '&orderby=fk_seg_inf,fk_tip_resp&asc');
    }
    listarResponsavelAtualizacaoPorEmpresaESegmentoInformacao(idEmpresa, idSeg) {
        return this.serverRq.consultar('resp-atualizacao/list?fk_emp=' + idEmpresa + '&fk_seg_inf=' + idSeg + '&orderby=fk_seg_inf,fk_tip_resp&asc');
    }

    deletarResponsavelAtualizacao(id) {
        return this.serverRq.deletar(`resp-atualizacao/${id}`);
    }
    cadastrarResponsavelAtualizacao(json: JSON) {
        return this.serverRq.cadastrar("resp-atualizacao/", json);
    }

    carregarResponsaveisAtualizacao(response) {
        this.responsaveisAtualizacao = new Array<ResponsavelAtualizacao>();
        response.forEach(responsavelAtualizacao => {

            this.responsaveisAtualizacao.push(new ResponsavelAtualizacao(
                responsavelAtualizacao.id,
                new Empresa(
                    responsavelAtualizacao.tbEmpresa.id,
                    responsavelAtualizacao.tbEmpresa.numCnpj,
                    responsavelAtualizacao.tbEmpresa.nmeEmpresa,
                    responsavelAtualizacao.tbEmpresa.sglEmpresa,
                    responsavelAtualizacao.tbEmpresa.codSiest,
                    responsavelAtualizacao.tbEmpresa.urlDominio
                ),
                new SegmentoInformacao(
                    responsavelAtualizacao.tbSeguimentoInformacao.id,
                    responsavelAtualizacao.tbSeguimentoInformacao.nmeSegmentoInformacao
                ),
                new Pessoa(
                    responsavelAtualizacao.tbPessoa.id,
                    responsavelAtualizacao.tbPessoa.numCpf,
                    responsavelAtualizacao.tbPessoa.nmePessoa,
                    undefined,
                    undefined,
                    responsavelAtualizacao.tbPessoa.numTelefone,
                    responsavelAtualizacao.tbPessoa.numCelular,
                    undefined,
                    responsavelAtualizacao.tbPessoa.emlInstitucional
                ),
                new TipoResponsabilidade(
                    responsavelAtualizacao.tdTipoResponsabilidade.id,
                    responsavelAtualizacao.tdTipoResponsabilidade.nmeTipoResponsabilidade
                ),
            ));
        });
        return this.responsaveisAtualizacao;
    }

    carregarResponsavelAtualizacao(response) {
        response.forEach(responsavelAtualizacao => {

            this.responsavelAtualizacao = new ResponsavelAtualizacao(
                responsavelAtualizacao.id,
                new Empresa(
                    responsavelAtualizacao.tbEmpresa.id,
                    responsavelAtualizacao.tbEmpresa.numCnpj,
                    responsavelAtualizacao.tbEmpresa.nmeEmpresa,
                    responsavelAtualizacao.tbEmpresa.sglEmpresa,
                    responsavelAtualizacao.tbEmpresa.codSiest,
                    responsavelAtualizacao.tbEmpresa.urlDominio
                ),
                new SegmentoInformacao(
                    responsavelAtualizacao.tbSeguimentoInformacao.id,
                    responsavelAtualizacao.tbSeguimentoInformacao.nmeSeguimentoInformacao
                ),
                new Pessoa(
                    responsavelAtualizacao.tbPessoa.id,
                    responsavelAtualizacao.tbPessoa.numCpf,
                    responsavelAtualizacao.tbPessoa.nmePessoa,
                    undefined,
                    undefined,
                    responsavelAtualizacao.tbPessoa.numTelefone,
                    responsavelAtualizacao.tbPessoa.numCelular,
                    undefined,
                    responsavelAtualizacao.tbPessoa.emlInstitucional
                ),
                new TipoResponsabilidade(
                    responsavelAtualizacao.tdTipoResponsabilidade.id,
                    responsavelAtualizacao.tdTipoResponsabilidade.nmeTipoResponsabilidade
                ),
            );

            return this.responsavelAtualizacao;
        });
        return null;
    }



}