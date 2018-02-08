
export class TipoGestao {
    _id: number;
    _nmeTipoGestao: string;
    _alsTipoGestao: string;
    constructor(id: number = 0, nmeTipoGestao: string = "",
        alsTipoGestao: string = "") {
        this._id = id;
        this._nmeTipoGestao = nmeTipoGestao;
        this._alsTipoGestao = alsTipoGestao;
        Object.freeze(this);
    }
    get id() {
        return this._id;
    }
    get nmeTipoGestao() {
        return this._nmeTipoGestao;
    }
    get alsTipoGestao() {
        return this._alsTipoGestao;
    }
    set id(id) {
        this._id = id;
    }
    set nmeTipoGestao(nmeTipoGestao) {
        this._nmeTipoGestao = nmeTipoGestao;
    }
    set alsTipoGestao(alsTipoGestao) {
        this._alsTipoGestao = alsTipoGestao;
    }
}

