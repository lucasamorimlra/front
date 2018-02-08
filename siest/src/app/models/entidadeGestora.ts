import { TipoGestao } from './tipoGestao';
import { DataHelper } from '../helpers/dataHelper';
let dateHelper = new DataHelper();
export class EntidadeGestora {
    _id: number;
    _numVagasTitular: number;
    _numSuplentes: number;
    _numRecond: number;
    _vlrRemuneracaoBase: string;
    _stsMandatoUnificado: string;
    _lclReuniao: string;
    _rnuPeriodicidade: string;
    _tipoGestao: TipoGestao;
    _dtaInicio: Date;
    _dtaFim: Date;
    constructor(id: number = 0, numVagasTitular: number = 0,
        numSuplentes: number = 0, numRecond: number = 0,
        vlrRemuneracaoBase: string = "", stsMandatoUnificado: string = "",
        lclReuniao: string = "", rnuPeriodicidade: string = "",
        tipoGestao: TipoGestao = new TipoGestao(), dtaInicio: Date = undefined, dtaFim: Date = undefined) {
        this._id = id;
        this._numVagasTitular = numVagasTitular;
        this._numSuplentes = numSuplentes;
        this._numRecond = numRecond;
        this._vlrRemuneracaoBase = vlrRemuneracaoBase;
        this._stsMandatoUnificado = stsMandatoUnificado;
        this._lclReuniao = lclReuniao;
        this._rnuPeriodicidade = rnuPeriodicidade;
        this._tipoGestao = tipoGestao;
        this._dtaInicio = dtaInicio;
        this._dtaFim = dtaFim;
        Object.freeze(this);
    }
    get id() {
        return this._id;
    }
    get numVagasTitular() {
        return this._numVagasTitular;
    }
    get numSuplentes() {
        return this._numSuplentes;
    }
    get numRecond() {
        return this._numRecond;
    }
    get vlrRemuneracaoBase() {
        return this._vlrRemuneracaoBase;
    }
    get stsMandatoUnificado() {
        return this._stsMandatoUnificado;
    }
    get mandatoUnificado() {
        if (this._stsMandatoUnificado) {
            return "Sim";
        }
        return "Não";
    }
    get lclReuniaoView() {
        if (this._lclReuniao) {
            return this._lclReuniao;
        }
        return "Não Informado";
    }
    get lclReuniao() {
        if (this._lclReuniao) {
            return this._lclReuniao;
        }
        return "";
    }
    get rnuPeriodicidadeView() {
        if (this._rnuPeriodicidade) {
            switch (this._rnuPeriodicidade) {
                case "0": {
                    return "Semanal"
                }
                case "1": {
                    return "Mensal"
                }
                case "2": {
                    return "Bimestral"
                }
                case "3": {
                    return "Trimestral"
                }
                case "4": {
                    return "Semestral"
                }
                case "5": {
                    return "Anual"
                }
            }
            return this._rnuPeriodicidade;
        }
        return "Não Informado";
    }
    get rnuPeriodicidade() {
        if (this._rnuPeriodicidade) {
            return this._rnuPeriodicidade;
        }
        return "Não Informado";
    }
    get tipoGestao() {
        return this._tipoGestao;
    }
    get dtaInicio() {
        return this._dtaInicio;
    }
    get dtaFim() {
        return this._dtaFim;
    }
    get dtaInicioFormatada() {
        if (this._dtaInicio != undefined) {
            return dateHelper.transformarMonth(this.dtaInicio + "");
        } else {
            return "Data não informada";
        }
    }
    get dtaFimFormatada() {
        if (this._dtaFim != undefined) {
            return dateHelper.transformarMonth(this.dtaFim + "");
        } else {
            return "Data não informada";
        }
    }
    set id(id) {
        this._id = id;
    }
    set numVagasTitular(numVagasTitular) {
        this._numVagasTitular = numVagasTitular;
    }
    set numSuplentes(numSuplentes) {
        this._numSuplentes = numSuplentes;
    }
    set numRecond(numRecond) {
        this._numRecond = numRecond;
    }
    set vlrRemuneracaoBase(vlrRemuneracaoBase) {
        this._vlrRemuneracaoBase = vlrRemuneracaoBase;
    }
    set stsMandatoUnificado(stsMandatoUnificado) {
        this._stsMandatoUnificado = stsMandatoUnificado;
    }
    set lclReuniao(lclReuniao) {
        this._lclReuniao = lclReuniao;
    }
    set rnuPeriodicidade(rnuPeriodicidade) {
        this._rnuPeriodicidade = rnuPeriodicidade;
    }
    set tipoGestao(tipoGestao) {
        this._tipoGestao = tipoGestao;
    }
    set dtaInicio(dtaInicio) {
        this._dtaInicio = dtaInicio;
    }
    set dtaFim(dtaFim) {
        this._dtaFim = dtaFim;
    }

}
