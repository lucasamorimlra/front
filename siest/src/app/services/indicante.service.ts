import { Injectable } from '@angular/core';
import { Indicante } from '../models/indicante';
import { ServerRequest } from '../helpers/serverRequest';


@Injectable()
export class IndicanteService {
    indicantes: Indicante[];
    indicante: Indicante;
    constructor(private serverRq: ServerRequest) {

    }
    listarIndicantes() {
        return this.serverRq.consultar('indicante/');
    }
    consultarIndicantePorId(id) {
        return this.serverRq.consultar("indicante/" + id);
    }

}