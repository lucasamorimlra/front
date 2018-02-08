//http://34.211.98.29:8090/siest/tipodocumento/list


export class TipoDocumento {
    _id: number;
    _nmeTipoDocumento: string;


    constructor(id: number = 0, nmeTipoDocumento: string = "") {
        this._id = id;
        this._nmeTipoDocumento = nmeTipoDocumento;

        Object.freeze(this);
    }
    get id() {
        return this._id;
    }
    get nmeTipoDocumento() {
        return this._nmeTipoDocumento;
    }
    set id(id) {
        this._id = id;
    }
    set nmeTipoDocumento(nmeTipoDocumento) {
        this._nmeTipoDocumento = nmeTipoDocumento;
    }
}

