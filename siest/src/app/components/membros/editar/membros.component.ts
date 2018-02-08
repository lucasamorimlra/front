import { Component, OnChanges, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { EntidadeGestora } from '../../../models/entidadeGestora';
import { EntidadeGestoraService } from '../../../services/entidadeGestora.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Vaga } from '../../../models/vaga';
import { VagaService } from '../../../services/vaga.service';
import { Pessoa } from '../../../models/pessoa';
import { PessoaService } from '../../../services/pessoa.service'
import { CpfValidator } from '../../../diretivas/validacaoCpf.directive';

@Component({
    templateUrl: './membros.component.html',
    styleUrls: ['./membros.component.css']
})

export class MembrosComponent implements OnInit {

    pessoaForm: FormGroup;
    idSelecionado: number;
    msgErro: string;
    entidadeGestora: EntidadeGestora;
    entidadeId: number;
    vagas: Array<Vaga>;
    vagasComplete: Array<any>;
    vagaId: number;
    abaAtiva: number;
    private filtroNmeEmpresa: string = "";
    empresa: Array<Empresa>;
    empresaId: number;
    pessoaId: number;
    trueId: string;
    membroOcupaVaga: any;

    constructor(
        private servicePessoa: PessoaService,
        private empresaServico: EmpresaService,
        private service: EntidadeGestoraService,
        private route: ActivatedRoute,
        private router: Router, private fb: FormBuilder, private location: Location, private vagService: VagaService ) {
        this.vagas = [];
    }
    onSubmit() {
        this.msgErro = "";
        
        if (!this.pessoaForm.invalid) {
            let formObj = this.pessoaForm.getRawValue();
            if (this.pessoaId === 0) {
                this.servicePessoa.cadastrarPessoa(formObj).then(data => {
                    if (data["code"] == 201 || data["code"] == 200) {
                        this.associaMembroVaga(data["id"]);
                        this.router.navigate(["empresa/" + this.empresaId + "/entidadeGestora/" + this.entidadeId]);
                    } else {
                        this.msgErro = data["message"];
                    }
                });
            } else {
                formObj["id"] = this.pessoaId;
                this.servicePessoa.editarPessoa(formObj).then(data => {
                    if (data["code"] == 201 || data["code"] == 200) {
                        this.associaMembroVaga(this.pessoaId);
                        this.router.navigate(["empresa/" + this.empresaId + "/entidadeGestora/" + this.entidadeId]);

                    } else {
                        this.msgErro = data["message"];
                    }
                });
            }
        } else {
            this.msgErro = "Formulário inválido. Reveja o preenchimento dos campos e a validade do CPF.";
        }
    }
    associaMembroVaga(pessoaId) {
        var membroVagaJson = '{ "tbUsuario": { "id": 1 }, "tbPessoa": { "id": ' + pessoaId + ' }, "tbVaga": { "id": ' + this.vagaId + ' }, "tdTipoSituacao": { "id": 1 }, "dtaInicio": "2015-08-16", "dtaFim": "2016-08-16" }';
        this.servicePessoa.addPessoaVaga(JSON.parse(membroVagaJson)).then(
            data => {
                console.log(data);
            }
        );
    }

    verificaMembroVaga(id: number) {
        if (typeof this.vagasComplete[id] != 'undefined') {
            return true;
        }
        else {
            return false;
        }
    }

    buscarPessoaPorCPF() {

        var sanitizedCpf = this.pessoaForm.controls.numCpf.value.replace(/[^\/\d]/g,'');
        console.log(sanitizedCpf)
        this.servicePessoa.listarPessoasPorCPF(sanitizedCpf).then(
            data => {
                if (data[0]) {
                    data.forEach(pessoa => {
                        const cpf = pessoa.numCpf;
                        this.pessoaForm = this.fb.group({
                            numCpf: new FormControl(cpf, [Validators.required, CpfValidator()]),
                            nmePessoa: pessoa.nmePessoa,
                            dtaEmissaoRg: pessoa.dtaEmissaoRg,
                            emlInstitucional: pessoa.emlInstitucional,
                            emlParticular: pessoa.emlParticular,
                            numCelular: pessoa.numCelular,
                            numTelefone: pessoa.numTelefone,
                            orgEmissaoRg: pessoa.orgEmissaoRg,
                            numRg: pessoa.numRg,
                            tbUsuario: { id: 1 }
                        });
                        this.pessoaId = pessoa.id;
                    });
                }
                else {
                    this.pessoaId = 0;
                }
            }
        )
    }
    voltar() {
        this.router.navigate(["empresa/" + this.empresaId + "/entidadeGestora/" + this.entidadeId]);
    }
    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.vagaId = +params["idVaga"];
            this.entidadeId = +params["idEntidadeGestora"];
            this.empresaId = +params["idEmpresa"];
        });
        this.initialize();
        this.vagService.consultarVagaPorIdEntidade(this.entidadeId).then(data => {
            this.vagas = this.vagService.carregarVagas(data);

        });
    }
    atualizarMembro() {
        this.route.params.subscribe(params => {
            this.vagaId = +params["idVaga"];
            this.entidadeId = +params["idEntidadeGestora"];
            this.empresaId = +params["idEmpresa"];
        })
        this.vagService.consultarVagaPorIdEntidade(this.entidadeId).then(data => {
            this.vagas = this.vagService.carregarVagas(data);
            this.initialize();
        });
    }

    initialize() {
        this.abaAtiva = this.vagaId;
        if (this.entidadeId !== 0 && this.entidadeId !== undefined) {
            this.service.consultarEntidadeGestoraPorId(this.entidadeId).then(data => {
                if (data !== []) {
                    this.entidadeGestora = this.service.carregarEntidadeGestora(data);
                }
            });
            this.vagService.consultarVagaCompleta(this.entidadeId).then(data => {
                let vagaSwitch = false;

                   this.vagasComplete = [];

                data.taMembroOcupaVagas.forEach((obj) => {

                    this.vagasComplete[obj.tbVaga.id] = obj.tbPessoa.nmePessoa;
                    if (obj.tbVaga.id == this.vagaId) {
                        this.pessoaId = obj.tbPessoa.id;
                        if (obj.tbPessoa.dtaEmissaoRg.indexOf("/") > -1) {
                            let data = obj.tbPessoa.dtaEmissaoRg.split("/");
                            obj.tbPessoa.dtaEmissaoRg = data[2] + "-" + data[1] + "-" + data[0];
                        }
                        vagaSwitch = true
                        this.pessoaForm = this.fb.group({
                            numCpf: new FormControl(obj.tbPessoa.numCpf, [Validators.required, CpfValidator()]),
                            nmePessoa: new FormControl(obj.tbPessoa.nmePessoa, [Validators.required]),
                            dtaEmissaoRg: new FormControl(obj.tbPessoa.dtaEmissaoRg, [Validators.required]),
                            emlInstitucional: new FormControl(obj.tbPessoa.emlInstitucional, [Validators.required]),
                            emlParticular: new FormControl(obj.tbPessoa.emlParticular, [Validators.required]),
                            numCelular: new FormControl(obj.tbPessoa.numCelular, [Validators.required]),
                            numTelefone: new FormControl(obj.tbPessoa.numTelefone, [Validators.required]),
                            orgEmissaoRg: new FormControl(obj.tbPessoa.orgEmissaoRg, [Validators.required]),
                            numRg: new FormControl(obj.tbPessoa.numRg, [Validators.required]),
                            tbUsuario: { id: 1 }
                        });
                    }
                });
                if (vagaSwitch == false) {
                    this.pessoaId = 0;
                    
                    this.pessoaForm = this.fb.group({
                        numCpf: new FormControl("", [Validators.required, CpfValidator()]),
                        nmePessoa: new FormControl("", [Validators.required]),
                        dtaEmissaoRg: new FormControl("", [Validators.required]),
                        emlInstitucional: new FormControl("", [Validators.required]),
                        emlParticular: new FormControl("", [Validators.required]),
                        numCelular: new FormControl("", [Validators.required]),
                        numTelefone: new FormControl("", [Validators.required]),
                        orgEmissaoRg: new FormControl("", [Validators.required]),
                        numRg: new FormControl("", [Validators.required]),
                        tbUsuario: { id: 1 }
                    });
                }
            })
        }
    }
}

