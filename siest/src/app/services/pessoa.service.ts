import { Injectable } from '@angular/core';
import { Pessoa } from '../models/pessoa';
import { ServerRequest } from '../helpers/serverRequest';


@Injectable()
export class PessoaService {
    pessoas: Pessoa[];
    pessoa: Pessoa;
    constructor(private serverRq: ServerRequest) {

    }
    listarPessoas() {
        return this.serverRq.consultar('pessoa/');
    }
    listarPessoasPorCPF(cpf) {
        return this.serverRq.consultar('pessoa/list?numCpf=' + cpf);
    }
    consultarPessoaPorId(id) {
        return this.serverRq.consultar(`pessoa/${id}`);
    }
    deletarPessoa(id) {
        return this.serverRq.deletar(`pessoa/${id}`);
    }
    addPessoaVaga(json: JSON) {
        return this.serverRq.cadastrar("pessoa/addmembrovaga", json);
    }
    removePessoaVaga(json: JSON) {
        return this.serverRq.cadastrar("pessoa/removemembrovaga", json);
    }
    cadastrarPessoa(json: JSON) {
        return this.serverRq.cadastrar("pessoa/", json);
    }
    editarPessoa(json: JSON) {
        return this.serverRq.atualizar("pessoa/", json);
    }
    carregarPessoas(response) {
        this.pessoas = new Array<Pessoa>();
        response.forEach(pessoa => {
            this.pessoas.push(new Pessoa(
                pessoa.id,
                pessoa.numCpf,
                pessoa.nmePessoa,
                pessoa.dtaEmissaoRG,
                pessoa.orgEmissaoRG,
                pessoa.numTelefone,
                pessoa.numCelular,
                pessoa.emlParticular,
                pessoa.emlInstitucional

            ));
        });
        return this.pessoas;
    }

    carregarPessoa(response) {
        response.forEach(pessoa => {
            this.pessoa = (new Pessoa(
                pessoa.id,
                pessoa.numCpf,
                pessoa.nmePessoa,
                pessoa.dtaEmissaoRG,
                pessoa.orgEmissaoRG,
                pessoa.numTelefone,
                pessoa.numCelular,
                pessoa.emlParticular,
                pessoa.emlInstitucional

            ));
            return this.pessoa;
        });
        return null;
    }


}