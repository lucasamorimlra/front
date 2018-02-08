export class Cargo {
    _id: number;
    _nmeCargo: string;
    constructor(id: number = 0, nmeCargo: string = "") {
        this._id = id;
        this._nmeCargo = nmeCargo;
        Object.freeze(this);
    }
    get id() {
        return this._id; 
    }
    get nmeCargo() {
        return this._nmeCargo;
    }
    set id(id) {
        this._id = id;
    }
    set nmeCargo(nmeCargo) {
        this._nmeCargo = nmeCargo;
    }
}