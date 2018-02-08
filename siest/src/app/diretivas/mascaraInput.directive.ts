import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import {
    NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl
} from '@angular/forms';

@Directive({
    selector: '[maskInput]'
})

export class MaskInput implements ControlValueAccessor {
    onTouched: any;
    onChange: any;
    @Input('maskInput') mask: string;

    constructor(private el: ElementRef, private control: NgControl) { }

    writeValue(value: any): void { 

        if (value) {
            this.el.nativeElement.value = this.aplicarMascara(value);
        }
    }
    registerOnChange(fn: any): void {

        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {

        this.onTouched = fn;
    }

    @HostListener('keyup', ['$event'])
    onKeyup($event: any) {
        let valor = $event.target.value.replace(/\D/g, '');

        // retorna caso pressionado backspace
        if ($event.keyCode === 8) {
            this.writeValue(valor);
            return;
        }

        let pad = this.mask.replace(/\D/g, '').replace(/9/g, '_');
        if (valor.length <= pad.length) {
            this.writeValue(valor);
        }

        $event.target.value = this.aplicarMascara(valor);

        this.control.control.setValue(this.el.nativeElement.value);
    }

    @HostListener('blur', ['$event'])
    onBlur($event: any) {

        if ($event.target.value.length <= this.mask.length) {
            return;
        }
        this.writeValue(' ');
        $event.target.value = ' ';
    }

    aplicarMascara(valor: string): string {
        valor = valor.replace(/\D/g, '');
        let pad = this.mask.replace(/\D/g, '').replace(/9/g, '_');
        let valorMask = valor + pad.substring(0, pad.length - valor.length);
        let valorMaskPos = 0;
        valor = '';
        for (let i = 0; i < this.mask.length; i++) {
            if (isNaN(parseInt(this.mask.charAt(i)))) {
                valor += this.mask.charAt(i);
            } else {
                valor += valorMask[valorMaskPos++];
            }
        }
        if (valor.indexOf('_') > -1) {
            valor = valor.substr(0, valor.indexOf('_'));
        }
        return valor;
    }
}