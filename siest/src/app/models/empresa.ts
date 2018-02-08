export class Empresa {
    _id: number;
    _numCnpj: string;
    _nmeEmpresa: string;
    _sglEmpresa: string;
    _codSiest: number;
    _urlDominio: string;


    constructor(id: number = 0, numCnpj: string = "",
        nmeEmpresa: string = "", sglEmpresa: string = "",
        codSiest: number = 0, urlDominio: string = "") {
        this._id = id;
        this._numCnpj = numCnpj;
        this._nmeEmpresa = nmeEmpresa;
        this._sglEmpresa = sglEmpresa;
        this._codSiest = codSiest;
        this._urlDominio = urlDominio;

        Object.freeze(this);
    }
    get id() {
        return this._id;
    }
    get numCnpj() {
        return this._numCnpj;
    }
    get nmeEmpresa() {
        return this._nmeEmpresa;
    }
    get sglEmpresa() {
        return this._sglEmpresa;
    }
    get codSiest() {
        return this._codSiest;
    }
    get urlDominio() {
        return this._urlDominio;
    }

    set id(id) {
        this._id = id;
    }
    set numCnpj(numCnpj) {
        this._numCnpj = numCnpj;
    }
    set nmeEmpresa(nmeEmpresa) {
        this._nmeEmpresa = nmeEmpresa;
    }
    set sglEmpresa(sglEmpresa) {
        this._sglEmpresa = sglEmpresa;
    }
    set codSiest(codSiest) {
        this._codSiest = codSiest;
    }
    set urlDominio(urlDominio) {
        this._urlDominio = urlDominio;
    }


}
