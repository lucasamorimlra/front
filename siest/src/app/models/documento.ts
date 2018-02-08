//http://34.211.98.29:8090/siest/tipodocumento/list

export class Documento {
    _id: number;
    _dscDocumento: string;
    _nmeDocumentoOriginal: string
    constructor(id: number = 0, dscDocumento: string = "", nmeDocumentoOriginal: string = "") {
        this._id = id;
        this._dscDocumento = dscDocumento;
        this._nmeDocumentoOriginal = nmeDocumentoOriginal;
        Object.freeze(this);
    }
    get id() {
        return this._id;
    }
    get dscDocumento() {
        return this._dscDocumento;
    }
    get nmeDocumentoOriginal() {
        return this._nmeDocumentoOriginal;
    }
    set id(id) {
        this._id = id;
    }
    set dscDocumento(dscDocumento) {
        this._dscDocumento = dscDocumento;
    }
    set nmeDocumentoOriginal(nmeDocumentoOriginal) {
        this._nmeDocumentoOriginal = nmeDocumentoOriginal;
    }
}

