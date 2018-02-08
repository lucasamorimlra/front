
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
import { Location } from '@angular/common';
@Component({
    templateUrl: './entidadeGestora-editar.html'
})
export class EntidadeGestoraEditar {
    @Input() entidadeGestora: EntidadeGestora;
    listatipoGestao: Array<TipoGestao>;
    listadeCargos: Array<Cargo>;
    listadeIndicantes: Array<Indicante>;
    listaVagasForm: Array<FormGroup>;
    idEmpresa: number;
    selecionadoID: number;
    entidageGestoraForm: FormGroup;
    msgErro: string;
    stsMandatoUnificadoTest: boolean;
    vagasVisualizar: boolean;
    numVagas: number;
    constructor(private service: EntidadeGestoraService,
        private empService: EmpresaService,
        private indService: IndicanteService,
        private carService: CargoService,
        private route: ActivatedRoute,
        private router: Router, private fb: FormBuilder,
        private vagService: VagaService, private location: Location) {
        this.criarFormulario();
    }
    criarFormulario() {
        this.vagasVisualizar = true;
        this.listaVagasForm = [];
        this.listadeCargos = [];
        this.listadeIndicantes = [];
        let parameters = this.router.url.split("/");

        this.selecionadoID = +parameters[4];
        this.idEmpresa = +parameters[2];
        this.service.consultarEntidadeGestoraPorId(this.selecionadoID).then(data => {
            this.entidadeGestora = this.service.carregarEntidadeGestora(data);
            this.entidageGestoraForm = this.fb.group({
                id: new FormControl(this.entidadeGestora.id),

                lclReuniao: new FormControl(this.entidadeGestora.lclReuniao),
                vlrRemuneracaoBase: new FormControl(this.entidadeGestora.vlrRemuneracaoBase),
                rnuPeriodicidade: new FormControl(this.entidadeGestora.rnuPeriodicidade),
                numVagasTitular: new FormControl(this.entidadeGestora.numVagasTitular),
                numRecond: new FormControl(this.entidadeGestora.numRecond),
                numSuplentes: new FormControl(this.entidadeGestora.numSuplentes),
                stsMandatoUnificado: new FormControl(this.entidadeGestora.stsMandatoUnificado),
                dtaInicio: new FormControl(this.entidadeGestora.dtaInicio),
                dtaFim: new FormControl(this.entidadeGestora.dtaFim)
            });
            this.stsMandatoUnificadoTest = this.entidageGestoraForm.controls.stsMandatoUnificado.value;
        });


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



    }
    editarEntidadeGestora() {

        let formObj = this.entidageGestoraForm.getRawValue();
        let testeRemuneracao = formObj["vlrRemuneracaoBase"];
        if (testeRemuneracao.indexOf("R$") > -1) {
            let vlrRemuneracao = testeRemuneracao.replace("R$", "").replace(",", "").trim();
            vlrRemuneracao.length;
            if (vlrRemuneracao.length > 3) {
                vlrRemuneracao = vlrRemuneracao.substr(0, vlrRemuneracao.length - 2) + "." +
                    vlrRemuneracao.substr(1, 2);
            }
            formObj["vlrRemuneracaoBase"] = vlrRemuneracao;
        }
        this.service.atualizarEntidadeGestora(formObj).then(data => {
            if (data["code"] == 201 || data["code"] == 200) {

                this.router.navigate(['/empresa', this.idEmpresa, "entidadeGestora", this.selecionadoID]);
            } else {
                this.msgErro = data["message"];
            }
        });
    }
    salvarVagas() {
        this.listaVagasForm.forEach(vagaForm => {
            let formObjVaga = vagaForm.getRawValue();
            if (formObjVaga["id"] == 0) {
                let testeRemuneracao = formObjVaga["vlrRemuneracaoBaseVaga"] + "";
                if (testeRemuneracao.indexOf("R$") > -1) {
                    let vlrRemuneracao = testeRemuneracao.replace("R$", "").replace(",", "").trim();
                    vlrRemuneracao.length;
                    if (vlrRemuneracao.length > 3) {
                        vlrRemuneracao = vlrRemuneracao.substr(0, vlrRemuneracao.length - 2) + "." +
                            vlrRemuneracao.substr(1, 2);
                    }
                    formObjVaga["vlrRemuneracaoBase"] = vlrRemuneracao;
                }
                formObjVaga["tdCargo"] = { id: Number(formObjVaga.fkCargo) };
                formObjVaga["tbIndicante"] = { id: Number(formObjVaga.fkIndicante) };
                formObjVaga["tbEntidadeGestora"] = { id: Number(this.selecionadoID) };
                delete formObjVaga.vlrRemuneracaoBaseVaga;
                delete formObjVaga.fkCargo;
                delete formObjVaga.fkIndicante;
                delete formObjVaga.tpoVaga;
                this.vagService.cadastrarVaga(formObjVaga);
            } else {

                let testeRemuneracao = formObjVaga["vlrRemuneracaoBaseVaga"] + "";
                if (testeRemuneracao.indexOf("R$") > -1) {
                    let vlrRemuneracao = testeRemuneracao.replace("R$", "").replace(",", "").trim();
                    vlrRemuneracao.length;
                    if (vlrRemuneracao.length > 3) {
                        vlrRemuneracao = vlrRemuneracao.substr(0, vlrRemuneracao.length - 2) + "." +
                            vlrRemuneracao.substr(1, 2);
                    }
                    formObjVaga["vlrRemuneracaoBase"] = vlrRemuneracao;
                }
                formObjVaga["tdCargo"] = { id: Number(formObjVaga.fkCargo) };
                formObjVaga["tbIndicante"] = { id: Number(formObjVaga.fkIndicante) };
                formObjVaga["tbEntidadeGestora"] = { id: Number(this.selecionadoID) };
                delete formObjVaga.vlrRemuneracaoBaseVaga;
                delete formObjVaga.fkCargo;
                delete formObjVaga.fkIndicante;
                delete formObjVaga.tpoVaga;
                this.vagService.atualizarVaga(formObjVaga);

            }
        })
        this.vagasVisualizar = true;
    }
    sairModal() {
        this.vagasVisualizar = true;
    }
    listaDeVagas() {
        this.numVagas = 0;
        this.vagasVisualizar = false;
        this.listaVagasForm = [];
        let contador = 0;
        let testdisabled = this.entidageGestoraForm.get("stsMandatoUnificado").value;

        if (!testdisabled) {
            this.entidageGestoraForm.get("dtaInicio").setValue("");
            this.entidageGestoraForm.get("dtaFim").setValue("");
        }
        this.vagService.consultarVagaCompletaList(this.selecionadoID).then((data) => {
            data.forEach((vaga) => {
                this.listaVagasForm.push(this.fb.group({
                    id: new FormControl(vaga["id"]),
                    vlrRemuneracaoBaseVaga: new FormControl(vaga["vlrRemuneracaoBase"]),
                    descVaga: new FormControl(vaga["descVaga"]),
                    tpoVaga: new FormControl(vaga["tipoVaga"] == true ? "Titular" : "Suplente"),
                    tipoVaga: vaga["tipoVaga"],
                    tbUsuario: { id: 1 },
                    nroVaga: new FormControl(vaga["nroVaga"]),
                    fkIndicante: new FormControl(vaga["tbIndicante"].id, Validators.required),
                    fkCargo: new FormControl(vaga["tdCargo"].id, Validators.required),
                    dtaInicio: new FormControl(""),
                    dtaFim: new FormControl("")
                }));
                this.numVagas++;
            })

        });


    }
    criarVagaTitular() {
        this.numVagas++;
        this.listaVagasForm.push(this.fb.group({
            id: new FormControl(0),
            vlrRemuneracaoBaseVaga: new FormControl(0),
            descVaga: new FormControl(""),
            tpoVaga: new FormControl("Titular"),
            tipoVaga: true,
            tbUsuario: { id: 1 },
            nroVaga: new FormControl(this.numVagas),
            fkIndicante: new FormControl("", Validators.required),
            fkCargo: new FormControl("", Validators.required),
            dtaInicio: new FormControl(""),
            dtaFim: new FormControl("")
        }));
    }
    criarVagaSuplente() {
        this.numVagas++;
        this.listaVagasForm.push(this.fb.group({
            id: new FormControl(0),
            vlrRemuneracaoBaseVaga: new FormControl(0),
            descVaga: new FormControl(""),
            tpoVaga: new FormControl("Suplente"),
            tipoVaga: true,
            tbUsuario: { id: 1 },
            nroVaga: new FormControl(this.numVagas),
            fkIndicante: new FormControl("", Validators.required),
            fkCargo: new FormControl("", Validators.required),
            dtaInicio: new FormControl(""),
            dtaFim: new FormControl("")
        }));
    }

    voltar() {
        this.location.back();
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
    excluirVaga(id, nro) {
        if (id != 0) {
            this.vagService.excluirVaga(this.idEmpresa).then((data) => {
                if (data["code"] == 200) {
                    let numArray = 0;
                    if (this.listaVagasForm.length > 1) {
                        this.listaVagasForm.forEach(data => {
                            if (data.controls.id.value == id) {
                                this.listaVagasForm.splice(numArray, 1);
                            }
                            numArray++;
                        });
                    }
                }
            })
        } else {
            let numArray = 0;
            if (this.listaVagasForm.length > 1) {
                this.listaVagasForm.forEach(data => {
                    if (data.controls.nroVaga.value == nro) {
                        this.listaVagasForm.splice(numArray, 1);
                    }
                    numArray++;
                });
            }
        }
    }
}








