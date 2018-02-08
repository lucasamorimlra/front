import { Component, Input } from '@angular/core';
import { SegmentoInformacao } from '../../../models/segmentoInformacao';
import { ResponsavelAtualizacao } from '../../../models/responsavelAtualizacao';
import { EmpresaService } from '../../../services/empresa.service';
import { TipoResponsabilidadeService } from '../../../services/tipoResponsabilidade.service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CpfValidator } from '../../../diretivas/validacaoCpf.directive';
import { EmailValidator } from '../../../diretivas/validacaoEmail.directive';
import { Empresa } from '../../../models/empresa';
import { PessoaService } from '../../../services/pessoa.service';
import { ResponsavelAtualizacaoService } from '../../../services/responsavelAtualizacao.service'
import { TipoResponsabilidade } from '../../../models/tipoResponsabilidade';
import { SegmentoInformacaoService } from '../../../services/segmentoInformacao.service';
@Component({
    templateUrl: './responsavelAtualizacao-cadastrar.html'
})



export class ResponsavelAtualizacaoCadastrar implements OnInit {
    @Input() responsavelAtualizacao: ResponsavelAtualizacao;
    responsavelAtualizacaoForm: FormGroup;
    segmentoInformacao: SegmentoInformacao;
    listaTiposResponsabilidades: any;
    empresa: Empresa;
    msgErro: string;
    pessoaId: number;
    empresaId: number;
    segId: number;
    constructor(
        private service: EmpresaService,
        private route: ActivatedRoute,
        private router: Router, private fb: FormBuilder, private location: Location,
        private tipoResponsabilidadeService: TipoResponsabilidadeService,
        private pessoaService: PessoaService,
        private responsavelAtualizacaoService: ResponsavelAtualizacaoService,
        private segmentoInformacaoService: SegmentoInformacaoService) {
        this.criarFormulario();
    }
    ngOnInit() {
        let indexOf = this.router.url.replace("/empresa/", "").indexOf("/");
        this.empresaId = +this.router.url.replace("/empresa/", "").substr(0, indexOf);
        this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {
                this.segId = +params['id'];
            }
        });

        this.listaTiposResponsabilidades = [];
        this.pessoaId = 0;
        this.service.consultarEmpresaPorId(this.empresaId).then(data => {
            this.empresa = this.service.carregarEmpresa(data);
        });
        this.segmentoInformacaoService.consultarSegmentoInformacaoPorId(this.segId).then(data => {
            data.forEach(segmento => {
                this.segmentoInformacao =
                    new SegmentoInformacao(segmento.id, segmento.nmeSeguimentoInformacao)

            });
        });
        this.tipoResponsabilidadeService.consultarTiposResponsabilidade().then(data => {
            data.forEach(tipoResponsabilidade => {
                this.listaTiposResponsabilidades = this.tipoResponsabilidadeService.carregarTiposResponsabilidade(data);
            });
        });

    }
    criarFormulario() {
        this.responsavelAtualizacao = new ResponsavelAtualizacao();
        this.responsavelAtualizacaoForm = this.fb.group({
            numCpf: new FormControl("", [Validators.required, CpfValidator()]),
            fkSegmentoInformacao: new FormControl(this.segId, [Validators.required]),
            fkTipoResponsabilidade: new FormControl("", [Validators.required]),
            nmePessoa: new FormControl("", [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
            emlInstitucional: new FormControl("", [Validators.required, EmailValidator()]),
            numTelefone: new FormControl("", [Validators.required, Validators.maxLength(15), Validators.minLength(14)])
            , numCelular: new FormControl("", [Validators.required, Validators.maxLength(15), Validators.minLength(14)])
            ,
            tbUsuario: { id: 1 }
        });
    }
    buscarPessoaPorCPF() {
        let cpf = this.responsavelAtualizacaoForm.controls.numCpf.value;
        if (cpf.length == 14 && !this.responsavelAtualizacaoForm.controls.numCpf.invalid) {
            this.pessoaService.listarPessoasPorCPF(cpf).then((data: JSON) => {
                if (JSON.stringify(data) !== JSON.stringify({})) {
                    this.responsavelAtualizacaoForm = this.fb.group({
                        numCpf: new FormControl(cpf, [Validators.required, CpfValidator()]),
                        fkSegmentoInformacao: new FormControl(this.segId, [Validators.required]),
                        fkTipoResponsabilidade: new FormControl(this.responsavelAtualizacaoForm.controls.fkTipoResponsabilidade.value, [Validators.required]),
                        nmePessoa: new FormControl(data[0].nmePessoa, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
                        emlInstitucional: new FormControl(data[0].emlInstitucional, [Validators.required, EmailValidator()]),
                        numTelefone: new FormControl(data[0].numTelefone, [Validators.required, Validators.maxLength(15), Validators.minLength(14)])
                        , numCelular: new FormControl(data[0].numCelular, [Validators.required, Validators.maxLength(15), Validators.minLength(14)])
                        , tbUsuario: { id: 1 }
                    });
                    this.pessoaId = +data[0].id;
                } else {
                    this.responsavelAtualizacaoForm = this.fb.group({
                        numCpf: new FormControl(cpf, [Validators.required, CpfValidator()]),
                        fkSegmentoInformacao: new FormControl(this.segId, [Validators.required]),
                        fkTipoResponsabilidade: new FormControl(this.responsavelAtualizacaoForm.controls.fkTipoResponsabilidade.value, [Validators.required]),
                        nmePessoa: new FormControl("", [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
                        emlInstitucional: new FormControl("", [Validators.required, EmailValidator()]),
                        numTelefone: new FormControl("", [Validators.required, Validators.maxLength(15), Validators.minLength(14)])
                        , numCelular: new FormControl("", [Validators.required, Validators.maxLength(15), Validators.minLength(14)])
                        ,

                        tbUsuario: { id: 1 }
                    });
                }
            })
        }
    }
    onSubmit() {

        let formObjPessoa = this.responsavelAtualizacaoForm.getRawValue();
        let formObjResponsavelAtualizacao = this.responsavelAtualizacaoForm.getRawValue();
        this.msgErro = "";

        if (!this.responsavelAtualizacaoForm.invalid) {
            delete formObjPessoa.fkSegmentoInformacao;
            delete formObjPessoa.fkTipoResponsabilidade;
            if (this.pessoaId == 0) {
                this.pessoaService.cadastrarPessoa(formObjPessoa).then(data => {

                    if (JSON.stringify(data) !== JSON.stringify({})) {
                        delete formObjResponsavelAtualizacao.numCpf;
                        delete formObjResponsavelAtualizacao.nmePessoa;
                        delete formObjResponsavelAtualizacao.emlInstitucional;
                        delete formObjResponsavelAtualizacao.numTelefone;
                        delete formObjResponsavelAtualizacao.numCelular;
                        delete formObjResponsavelAtualizacao.tbUsuario;
                        formObjResponsavelAtualizacao.tbPessoa = { "id": data["id"] }
                        formObjResponsavelAtualizacao.tbSeguimentoInformacao = { "id": formObjResponsavelAtualizacao.fkSegmentoInformacao }
                        formObjResponsavelAtualizacao.tdTipoResponsabilidade = { "id": formObjResponsavelAtualizacao.fkTipoResponsabilidade }
                        formObjResponsavelAtualizacao.tbEmpresa = { "id": this.empresaId };
                        delete formObjResponsavelAtualizacao.fkSegmentoInformacao;
                        delete formObjResponsavelAtualizacao.fkTipoResponsabilidade;
                        this.responsavelAtualizacaoService.cadastrarResponsavelAtualizacao(formObjResponsavelAtualizacao).then(data => {
                            this.location.back();

                        })
                    }
                });
            } else {
                formObjPessoa.id = this.pessoaId;
                this.pessoaService.editarPessoa(formObjPessoa).then(data => {

                    if (JSON.stringify(data) !== JSON.stringify({})) {
                        delete formObjResponsavelAtualizacao.numCpf;
                        delete formObjResponsavelAtualizacao.nmePessoa;
                        delete formObjResponsavelAtualizacao.emlInstitucional;
                        delete formObjResponsavelAtualizacao.numTelefone;
                        delete formObjResponsavelAtualizacao.numCelular;
                        delete formObjResponsavelAtualizacao.tbUsuario;

                        formObjResponsavelAtualizacao.tbPessoa = { "id": data["id"] }
                        formObjResponsavelAtualizacao.tbSeguimentoInformacao = { "id": formObjResponsavelAtualizacao.fkSegmentoInformacao }
                        formObjResponsavelAtualizacao.tdTipoResponsabilidade = { "id": formObjResponsavelAtualizacao.fkTipoResponsabilidade }
                        formObjResponsavelAtualizacao.tbEmpresa = { "id": this.empresaId };
                        delete formObjResponsavelAtualizacao.fkSegmentoInformacao;
                        delete formObjResponsavelAtualizacao.fkTipoResponsabilidade;
                        this.responsavelAtualizacaoService.cadastrarResponsavelAtualizacao(formObjResponsavelAtualizacao).then(data => {
                            this.location.back();

                        })
                    }
                });
            }
        }

    }
    voltar() {
        this.location.back();
    }


}








