
export class SegmentoInformacao {
    _id: number;
    _nmeSegmentoInformacao: string;

    constructor(id: number = 0, nmeSegmentoInformacao: string = "") {
        this._id = id;
        this._nmeSegmentoInformacao = nmeSegmentoInformacao;

        Object.freeze(this);
    }
    get id() {
        return this._id;
    }
    get nmeSegmentoInformacao() {
        return this._nmeSegmentoInformacao;
    }
    set id(id) {
        this._id = id;
    }
    set nmeSegmentoInformacao(nmeSegmentoInformacao) {
        this._nmeSegmentoInformacao = nmeSegmentoInformacao;
    }
}

