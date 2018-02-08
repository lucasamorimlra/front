import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS } from "@angular/forms";
import { Validator } from "@angular/forms/src/directives/validators";
import { AbstractControl, ValidatorFn } from "@angular/forms/forms";

@Directive({
    selector: '[valorEmail]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator {
    @Input() valorEmail: string;
    validate(control: AbstractControl): { [key: string]: any } {
        return this.valorEmail ? EmailValidator()(control)
            : null;
    }
}
export function EmailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email = control.value;
        let teste = re.test(email);
        if (teste) {
            return null;
        } else {
            return { 'valorEmail': { value: email } };
        }
    }

}