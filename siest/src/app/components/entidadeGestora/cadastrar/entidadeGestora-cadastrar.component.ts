
import { Component, OnChanges, Input } from '@angular/core';
import { EntidadeGestora } from '../../../models/entidadeGestora';
import { TipoGestao } from '../../../models/tipoGestao';
import { EntidadeGestoraService } from '../../../services/entidadeGestora.service';
import { TipoGestaoService } from '../../../services/tipoGestao.service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CnpjValidator } from '../../../diretivas/validacaoCnpj.directive';
import { MaskCurrencyDirective } from '../../../diretivas/mascaraInputMoney.directive';
import { Empresa } from "../../../models/empresa";
import { EmpresaService } from "../../../services/empresa.service";
import { CargoService } from "../../../services/cargo.service";
import { IndicanteService } from "../../../services/indicante.service";
import { VagaService } from "../../../services/vaga.service";
import { Cargo } from "../../../models/cargo";
import { Indicante } from "../../../models/indicante";
@Component({
    templateUrl: './entidadeGestora-cadastrar.html'
})
export class EntidadeGestoraCadastrar {
    @Input() entidadeGestora: EntidadeGestora;
    listatipoGestao: Array<TipoGestao>;
    listadeCargos: Array<Cargo>;
    listadeIndicantes: Array<Indicante>;
    listaVagasForm: Array<FormGroup>;
    empresa: Empresa;
    selecionadoID: number;
    entidageGestoraForm: FormGroup;
    msgErro: string;
    etapa: number;
    stsMandatoUnificadoTest: boolean;
    constructor(     private service: EntidadeGestoraService,
        private empService: EmpresaService,
        private tpGService: TipoGestaoService,
        private indService: IndicanteService,
        private carService: CargoService,
        private route: ActivatedRoute,
        private router: Router, private fb: FormBuilder,
        private vagService: VagaService) {
        this.criarFormulario();
    }
    criarFormulario() {
        this.listatipoGestao = [];
        this.listaVagasForm = [];
        this.listadeCargos = [];
        this.listadeIndicantes = [];
        this.selecionadoID = +this.router.url.replace("/empresa/", "").replace("/cadastrarEntidadeGestora", "");
        this.stsMandatoUnificadoTest = false;
        this.tpGService.listarTiposGestaoDisponiveisPorEmpresa(this.selecionadoID).then(
            data => data.forEach(tipoGestao => {
                this.listatipoGestao.push(
                    new TipoGestao(tipoGestao.id,
                        tipoGestao.nmeTipoGestao,
                        tipoGestao.alsTipoGestao)
                );
            })
        );
        this.carService.listarCargoseIndicantes().then(
            data => {
                data["cargos"].forEach(cargo => {
                    this.listadeCargos.push(
                        new Cargo(cargo.id, cargo.nmeCargo)
                    );
                });
                data["orgaosIndicadores"].forEach(indicante => {
                    this.listadeIndicantes.push(
                        new Indicante(indicante.id, indicante.nmeIndicante)
                    );
                });
            }
        );
        this.etapa = 1;
        this.empService.consultarEmpresaPorId(this.selecionadoID).then(
            data => this.empresa = this.empService.carregarEmpresa(data)
        );

        this.entidageGestoraForm = this.fb.group({
            fkTipoGestao: new FormControl("",
                [Validators.required]),
            lclReuniao: new FormControl(""),
            vlrRemuneracaoBase: new FormControl(0.00),
            rnuPeriodicidade: new FormControl(""),
            numVagasTitular: new FormControl("",
                [Validators.required, Validators.min(1)]),
            numRecond: new FormControl(0,
                [Validators.required, Validators.min(0)]),
            numSuplentes: new FormControl(0,
                [Validators.required, Validators.min(0)]),
            tbEmpresa: { id: this.selecionadoID },
            tbUsuario: { id: 1 },
            stsMandatoUnificado: new FormControl(false),
            dtaInicio: new FormControl("", Validators.required),
            dtaFim: new FormControl("", Validators.required)
        });
    }
    cadastrarEntidadeGestora() {

        let formObj = this.entidageGestoraForm.getRawValue();
        formObj["tdTipoGestao"] = { id: Number(formObj.fkTipoGestao) };
        if (formObj.vlrRemuneracaoBase) {
            let vlrRemuneracao = formObj.vlrRemuneracaoBase.replace("R$", "").replace(",", "").trim();
            vlrRemuneracao.length;
            if (vlrRemuneracao.length > 3) {
                vlrRemuneracao = vlrRemuneracao.substr(0, vlrRemuneracao.length - 2) + "." +
                    vlrRemuneracao.substr(1, 2);

            }
            formObj["vlrRemuneracaoBase"] = vlrRemuneracao;
        }
        delete formObj.fkTipoGestao;
        this.service.cadastrarEntidadeGestora(formObj).then(data => {
            if (data["code"] == 201 || data["code"] == 200) {
                this.listaVagasForm.forEach(vagaForm => {
                    let formObjVaga = vagaForm.getRawValue();

                    if (formObjVaga.vlrRemuneracaoBaseVaga) {

                        let vlrRemuneracao = formObjVaga.vlrRemuneracaoBaseVaga.replace("R$", "").replace(",", "").trim();
                        vlrRemuneracao.length;
                        if (vlrRemuneracao.length > 3) {
                            vlrRemuneracao = vlrRemuneracao.substr(0, vlrRemuneracao.length - 2) + "." +
                                vlrRemuneracao.substr(1, 2);

                        }
                        formObjVaga["vlrRemuneracaoBase"] = vlrRemuneracao;

                    }
                    formObjVaga["tdCargo"] = { id: Number(formObjVaga.fkCargo) };
                    formObjVaga["tbIndicante"] = { id: Number(formObjVaga.fkIndicante) };
                    formObjVaga["tbEntidadeGestora"] = { id: Number(data["id"]) };
                    delete formObjVaga.vlrRemuneracaoBaseVaga;
                    delete formObjVaga.fkCargo;
                    delete formObjVaga.fkIndicante;
                    delete formObjVaga.tpoVaga;
                    this.vagService.cadastrarVaga(formObjVaga);

                })
                this.router.navigate(['/empresa', this.empresa.id, "gestao"]);
            } else {
                this.msgErro = data["message"];
            }
        });
    }
    etapa1() {
        this.etapa = 1;
        this.voltar = function () { this.router.navigate(['/empresa', this.selecionadoID, "gestao"]); };
    }
    etapa2() {
        this.etapa = 2;
        this.voltar = function () { this.etapa1() };
    }
    etapa3() {
        this.listaVagasForm = [];
        let contador = 0;
        let testdisabled = this.entidageGestoraForm.get("stsMandatoUnificado").value;
        if (!testdisabled) {
            this.entidageGestoraForm.get("dtaInicio").setValue("");
            this.entidageGestoraForm.get("dtaFim").setValue("");
        }
        let dtaInicio = this.entidageGestoraForm.get("dtaInicio").value;
        let dtaFim = this.entidageGestoraForm.get("dtaFim").value;
        let vlrRemuneracaoBaseEntidadeGestora = this.entidageGestoraForm.get("vlrRemuneracaoBase").value;
        for (let i = 1; i <= this.entidageGestoraForm.get("numVagasTitular").value; i++) {
            contador++;
            this.listaVagasForm.push(this.fb.group({
                vlrRemuneracaoBaseVaga: new FormControl(vlrRemuneracaoBaseEntidadeGestora),
                descVaga: new FormControl(""),
                tpoVaga: new FormControl("Titular"),
                tipoVaga: true,
                tbUsuario: { id: 1 },
                nroVaga: new FormControl(contador),
                dtaInicio: new FormControl({ value: dtaInicio, disabled: testdisabled }),
                dtaFim: new FormControl({ value: dtaFim, disabled: testdisabled }),
                fkIndicante: new FormControl("", Validators.required),
                fkCargo: new FormControl("", Validators.required)
            }));
        }
        for (let i = 1; i <= this.entidageGestoraForm.get("numSuplentes").value; i++) {
            contador++;
            this.listaVagasForm.push(this.fb.group({
                vlrRemuneracaoBaseVaga: new FormControl(vlrRemuneracaoBaseEntidadeGestora),
                descVaga: new FormControl(""),
                tpoVaga: new FormControl("Suplente"),
                tipoVaga: false,
                tbUsuario: { id: 1 },
                nroVaga: new FormControl(contador),
                dtaInicio: new FormControl({ value: dtaInicio, disabled: testdisabled }),
                dtaFim: new FormControl({ value: dtaFim, disabled: testdisabled }),
                fkIndicante: new FormControl("", Validators.required),
                fkCargo: new FormControl("", Validators.required)
            }));
        }
        this.etapa = 3;
    }
    validarEtapa1() {
        if (!this.entidageGestoraForm.controls.fkTipoGestao.invalid) {
            return false;
        } else {
            return true;
        }
    }
    validarEtapa2() {
        let teste = true;
        if (this.entidageGestoraForm.controls.stsMandatoUnificado.value == true) {
            teste = this.validarEtapa2CasoMandatoUnificado();
        }
        if (!this.entidageGestoraForm.controls.numVagasTitular.invalid
            && !this.entidageGestoraForm.controls.numRecond.invalid &&
            !this.entidageGestoraForm.controls.numSuplentes.invalid && teste) {
            return false;
        } else {
            return true;
        }
    }
    validarEtapa2CasoMandatoUnificado() {
        if (!this.entidageGestoraForm.controls.dtaInicio.invalid
            && !this.entidageGestoraForm.controls.dtaFim.invalid) {
            return true;
        } else {
            return false;
        }
    }
    mudarStsMandatoUnificado() {
        this.stsMandatoUnificadoTest = !this.stsMandatoUnificadoTest;
    }
    voltar() {
        this.router.navigate(['/empresa', this.selecionadoID, "gestao"]);
    }
    validarVagas() {
        let teste = false;
        this.listaVagasForm.forEach(data => {
            if (data.invalid) {
                teste = true;
                return;
            }
        });
        return teste;
    }
    excluirVaga(nroVaga) {
        let numArray = 0;
        if (this.listaVagasForm.length > 1) {
            this.listaVagasForm.forEach(data => {
                if (data.controls.nroVaga.value == nroVaga.value) {
                    this.listaVagasForm.splice(numArray, 1);
                }
                numArray++;
            });
        }
    }
}








