
export class Pessoa {
    private _id: number;
    private _numCpf: string;
    private _nmePessoa: string;
    private _dtaEmissaoRg: Date;
    private _orgEmissaoRg: string;
    private _numTelefone: string;
    private _numCelular: string;
    private _emlParticular: string; 
    private _emlInstitucional: string;
    private _numRg: string;
    

    constructor(id: number = 0, numCpf: string = "", nmePessoa: string = "",
        alsTipoGestao: string = "", dtaEmissaoRg: Date = new Date(), orgEmissaoRg: string = "",
        numTelefone: string = "", numCelular: string = "", emlParticular: string = "",
        emlInstitucional: string = "", numRg: string = "") {
        this._id = id;
        this._numCpf = numCpf;
        this._nmePessoa = nmePessoa;
        this._dtaEmissaoRg = dtaEmissaoRg;
        this._orgEmissaoRg = orgEmissaoRg;
        this._numTelefone = numTelefone;
        this._numCelular = numCelular;
        this._emlParticular = emlParticular;
        this._emlInstitucional = emlInstitucional;
        this._numRg = numRg;
        Object.freeze(this);
    }
    get id() {
        return this._id;
    }
    get numCpf() {
        return this._numCpf;
    }
    get nmePessoa() {
        return this._nmePessoa;
    }
    get dtaEmissaoRg() {
        return this._dtaEmissaoRg;
    }
    get orgEmissaoRg() {
        return this._orgEmissaoRg;
    }
    get numTelefone() {
        return this._numTelefone;
    }
    get numCelular() {
        return this._numCelular;
    }
    get emlParticular() {
        return this._emlParticular;
    }
    get emlInstitucional() {
        return this._emlInstitucional;
    }
    get numRg(){
        return this._numRg;
    }
    set id(id) {
        this._id = id;
    }
    set numCpf(numCpf) {
        this._numCpf = numCpf;
    }
    set nmePessoa(nmePessoa) {
        this._nmePessoa = nmePessoa;
    }
    set dtaEmissaoRg(dtaEmissaoRg) {
        this._dtaEmissaoRg = dtaEmissaoRg;
    }
    set orgEmissaoRg(orgEmissaoRg) {
        this._orgEmissaoRg = orgEmissaoRg;
    }
    set numTelefone(numTelefone) {
        this._numTelefone = numTelefone;
    }
    set numCelular(numCelular) {
        this._numCelular = numCelular;
    }
    set emlParticular(emlParticular) {
        this._emlParticular = emlParticular;
    }
    set emlInstitucional(emlInstitucional) {
        this._emlInstitucional = emlInstitucional;
    }
    set numRg(numRg){
        this._numRg = numRg;
    }
}

