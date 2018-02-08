import { Injectable } from '@angular/core';
import { Cargo } from '../models/cargo';
import { ServerRequest } from '../helpers/serverRequest';

@Injectable()
export class CargoService {
    cargos: Cargo[];
    cargo: Cargo;
    constructor(private serverRq: ServerRequest) {

    }
    listarCargoseIndicantes() {
        return this.serverRq.consultar('cargo/');
    }
    consultarCargoPorId(id) {
        return this.serverRq.consultar(`cargo/${id}`);
    }

}