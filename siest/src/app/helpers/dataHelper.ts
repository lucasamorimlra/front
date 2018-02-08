import { Injectable } from '@angular/core';
@Injectable()
export class DataHelper {
    monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    transformarMonth(month: string) {
        let ano = month.substr(0, 4);
        let mes = this.monthNames[+month.substr(5, 2) - 1];
        return mes + " de " + ano;
    }


}