
export class MetaEntidadeDocumento {
    _id: number;
    _idEntidade: number;
    constructor(id: number = 0, idEntidade: number = 0) {
        this._id = id;
        this._idEntidade = idEntidade;
        Object.freeze(this);
    }
    get id() {
        return this._id;
    }
    get idEntidade() {
        return this._idEntidade;
    }
    set id(id) {
        this._id = id;
    }
    set idEntidade(idEntidade) {
        this._idEntidade = idEntidade;
    }

}