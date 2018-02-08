
import { Component } from '@angular/core';
import { ResponsavelAtualizacao } from '../../../models/responsavelAtualizacao';
import { ResponsavelAtualizacaoService } from '../../../services/responsavelAtualizacao.service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { Empresa } from '../../../models/empresa';
import { SegmentoInformacao } from '../../../models/segmentoInformacao';
import { Pessoa } from '../../../models/pessoa';
import { TipoResponsabilidade } from '../../../models/tipoResponsabilidade';
@Component({
    templateUrl: './responsavelAtualizacao-excluir.html'

})

export class ResponsavelAtualizacaoExcluir implements OnInit {
    responsavelAtualizacao: ResponsavelAtualizacao;
    selecionadoID: number;
    mensagem: string;

    constructor(
        private service: ResponsavelAtualizacaoService,
        private route: ActivatedRoute,
        private router: Router, private location: Location) {
    }
    ngOnInit(): void {

        this.route.params.subscribe(params => {
            this.selecionadoID = +params['id'];
            if (this.selecionadoID !== 0 && this.selecionadoID !== undefined) {
                this.service.consultarResponsavelAtualizacaoPorId(this.selecionadoID).then(data => {
                    if (JSON.stringify(data) !== JSON.stringify({})) {
                        data.forEach(responsavelAtualizacao => {
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
                        });
                    }
                })
            }
        });
    }
    fecharModal() {
        this.location.back();
    }
    excluirResponsavelPeloSeguimento() {

        this.service.deletarResponsavelAtualizacao(this.selecionadoID).then(data => {
            if (data["code"] == "200") {
                this.location.back();
            } else {
                this.mensagem = "Não Foi possivel deletar o Responsável pelo Segmento";
            }
        });
    }
}








