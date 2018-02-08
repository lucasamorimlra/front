


import { EntidadeGestora } from "./entidadeGestora";
import { Indicante } from "./indicante";
import { Cargo } from "./cargo";
import { DataHelper } from '../helpers/dataHelper';


export class Vaga {
    dateHelper = new DataHelper();
    _id: number;
    _vlrRemuneracaoBase: string;
    _dscVaga: string;
    _tpoVaga: boolean;
    _nroVaga: number;
    _dtaInicio: string;
    _dtaFim: string;
    _entidadeGestora: EntidadeGestora;
    _indicante: Indicante;
    _cargo: Cargo;
    constructor(id: number = 0, vlrRemuneracaoBase: string = "", dscVaga: string = "", tpoVaga: boolean = true, nroVaga: number = 0,
        dtaInicio: string = "", dtaFim: string = "", entidadeGestora: EntidadeGestora = new EntidadeGestora(),
        indicante: Indicante = new Indicante(), cargo: Cargo = new Cargo()) {
        this._id = id;
        this._vlrRemuneracaoBase = vlrRemuneracaoBase;
        this._dscVaga = dscVaga;
        this._tpoVaga = tpoVaga;
        this._nroVaga = nroVaga;
        this._dtaInicio = dtaInicio;
        this._dtaFim = dtaFim;
        this._entidadeGestora = entidadeGestora;
        this._indicante = indicante;
        this._cargo = cargo;
        Object.freeze(this);
    }
    get id() {
        return this._id;
    }
    get vlrRemuneracaoBase() {
        return this._vlrRemuneracaoBase;
    }
    get dscVaga() {
        return this._dscVaga;
    }
    get tpoVaga() {
        return this._tpoVaga;
    }
    get nroVaga() {
        return this._nroVaga;
    }
    get dtaInicio() {
        return this._dtaInicio;
    }
    get dtaFim() {
        return this._dtaFim;
    }

    get dtaInicioFormatada() {
        return this.dateHelper.transformarMonth(this.dtaInicio + "");
    }
    get dtaFimFormatada() {
        return this.dateHelper.transformarMonth(this.dtaFim + "");
    }




    get entidadeGestora() {
        return this._entidadeGestora;
    }
    get indicante() {
        return this._indicante;
    }
    get cargo() {
        return this._cargo;
    }
    set id(id) {
        this._id = id;
    }
    set vlrRemuneracaoBase(vlrRemuneracaoBase) {
        this._vlrRemuneracaoBase = vlrRemuneracaoBase;
    }
    set dscVaga(dscVaga) {
        this._dscVaga = dscVaga;
    }
    set tpoVaga(tpoVaga) {
        this._tpoVaga = tpoVaga;
    }
    get nmeTipoVaga() {
        return this._tpoVaga == true ? "Titular" : "Suplente";
    }
    set nroVaga(nroVaga) {
        this._nroVaga = nroVaga;
    }
    set dtaInicio(dtaInicio) {
        this._dtaInicio = dtaInicio;
    }
    set dtaFim(dtaFim) {
        this._dtaFim = dtaFim;
    }
    set entidadeGestora(entidadeGestora) {
        this._entidadeGestora = entidadeGestora;
    }
    set indicante(indicante) {
        this._indicante = indicante;
    }
    set cargo(cargo) {
        this._cargo = cargo;
    }


}