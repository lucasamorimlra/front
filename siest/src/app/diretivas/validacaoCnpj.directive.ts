import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS } from "@angular/forms";
import { Validator } from "@angular/forms/src/directives/validators";
import { AbstractControl, ValidatorFn } from "@angular/forms/forms";

@Directive({
    selector: '[valorCNPJ]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CnpjValidatorDirective, multi: true }]
})
export class CnpjValidatorDirective implements Validator {
    @Input() valorCNPJ: string;

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valorCNPJ ? CnpjValidator()(control)
            : null;
    }
}

export function CnpjValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let cnpj = control.value.replace(/[^\d]+/g, '');
        if (cnpj == '') return { 'valorCNPJ': { value: cnpj } };
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return { 'valorCNPJ': { value: cnpj } };
        if (cnpj.length != 14)
            return { 'valorCNPJ': { value: cnpj } };
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let icn = tamanho; icn >= 1; icn--) {
            soma += numeros.charAt(tamanho - icn) * pos--;
            if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return { 'valorCNPJ': { value: cnpj } };;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let icn = tamanho; icn >= 1; icn--) {
            soma += numeros.charAt(tamanho - icn) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return { 'valorCNPJ': { value: cnpj } };

        return null;
    };
}

