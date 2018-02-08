import { Injectable } from '@angular/core';

import { ServerRequest } from '../helpers/serverRequest';
import { SegmentoInformacao } from '../models/segmentoInformacao';


@Injectable()
export class SegmentoInformacaoService {
    indicantes: SegmentoInformacao[];
    indicante: SegmentoInformacao;
    constructor(private serverRq: ServerRequest) {

    }
    listarSegmentoInformacao() {
        return this.serverRq.consultar('segmento-informacao/');
    }
    consultarSegmentoInformacaoPorId(id) {
        return this.serverRq.consultar("segmento-informacao/" + id);
    }

}