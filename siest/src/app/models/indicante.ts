
export class Indicante {
    _id: number;
    _nmeIndicante: string;
    constructor(id: number = 0, nmeIndicante: string = "") {
        this._id = id;
        this._nmeIndicante = nmeIndicante;
        Object.freeze(this);
    }
    get id() {
        return this._id;
    }
    get nmeIndicante() {
        return this._nmeIndicante;
    }
    set id(id) {
        this._id = id;
    }
    set nmeIndicante(nmeIndicante) {
        this._nmeIndicante = nmeIndicante;
    }

}