import { Empresa } from "./empresa";
import { SegmentoInformacao } from "./segmentoInformacao";
import { Pessoa } from "./pessoa";
import { TipoResponsabilidade } from "./tipoResponsabilidade";



export class ResponsavelAtualizacao {
    _id: number;
    _empresa: Empresa;
    _segmentoInformacao: SegmentoInformacao;
    _pessoa: Pessoa;
    _tipoResponsabilidade: TipoResponsabilidade;
    constructor(id: number = 0,
        empresa: Empresa = new Empresa,
        segmentoInformacao: SegmentoInformacao = new SegmentoInformacao,
        pessoa: Pessoa = new Pessoa,
        tipoResponsabilidade: TipoResponsabilidade = new TipoResponsabilidade) {
        this._id = id;
        this._empresa = empresa;
        this._segmentoInformacao = segmentoInformacao;
        this._pessoa = pessoa;
        this._tipoResponsabilidade = tipoResponsabilidade;
        Object.freeze(this);
    }
    get id() {
        return this._id;
    }
    get empresa() {
        return this._empresa;
    }
    get segmentoInformacao() {
        return this._segmentoInformacao;
    }
    get pessoa() {
        return this._pessoa;
    }
    get tipoResponsabilidade() {
        return this._tipoResponsabilidade;
    }
    set id(id) {
        this._id = id;
    }
    set empresa(empresa) {
        this._empresa = empresa;
    }
    set segmentoInformacao(segmentoInformacao) {
        this._segmentoInformacao = segmentoInformacao;
    }
    set pessoa(pessoa) {
        this._pessoa = pessoa;
    }
    set tipoResponsabilidade(tipoResponsabilidade) {
        this._tipoResponsabilidade = tipoResponsabilidade;
    }

}

