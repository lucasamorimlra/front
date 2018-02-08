import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS } from "@angular/forms";
import { Validator } from "@angular/forms/src/directives/validators";
import { AbstractControl, ValidatorFn } from "@angular/forms/forms";

@Directive({
    selector: '[valorCPF]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CpfValidatorDirective, multi: true }]
})
export class CpfValidatorDirective implements Validator {
    @Input() valorCPF: string;
    validate(control: AbstractControl): { [key: string]: any } {
        return this.valorCPF ? CpfValidator()(control)
            : null;
    }
}
export function CpfValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        console.log(control.value);

        var Soma;
        var Resto;
        Soma = 0;
        let cpf = control.value.replace(/\./g, '').replace(/\-/g, '')
        if (cpf == "00000000000") return { 'valorCpf': { value: cpf } };
        let icp;
        for (icp = 1; icp <= 9; icp++) Soma = Soma + parseInt(cpf.substring(icp - 1, icp)) * (11 - icp);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(cpf.substring(9, 10))) return { 'valorCpf': { value: cpf } };

        Soma = 0;
        for (icp = 1; icp <= 10; icp++) Soma = Soma + parseInt(cpf.substring(icp - 1, icp)) * (12 - icp);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(cpf.substring(10, 11))) return { 'valorCpf': { value: cpf } };
        return null;



    }

}