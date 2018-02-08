
export class TipoResponsabilidade {
    _id: number;
    _nmeTipoResponsabilidade: string;
    constructor(id: number = 0, nmeTipoResponsabilidade: string = "") {
        this._id = id;
        this._nmeTipoResponsabilidade = nmeTipoResponsabilidade;
        Object.freeze(this);
    }
    get id() {
        return this._id;
    }
    get nmeTipoResponsabilidade() {
        return this._nmeTipoResponsabilidade;
    }
    set id(id) {
        this._id = id;
    }
    set nmeTipoResponsabilidade(nmeTipoResponsabilidade) {
        this._nmeTipoResponsabilidade = nmeTipoResponsabilidade;
    }
}

