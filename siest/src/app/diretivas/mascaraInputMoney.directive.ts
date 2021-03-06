import {
  Directive,
  HostListener,
  Input,
  OnInit,
  ElementRef
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR, ControlValueAccessor
} from '@angular/forms';

@Directive({
  selector: '[maskCurrency]'
})
export class MaskCurrencyDirective implements ControlValueAccessor, OnInit {

  onTouched: any;
  onChange: any;

  separadorDecimal: string;
  //separadorMilhar: string;
  prefixo: string;

  @Input('maskCurrency') Mask: any;

  constructor(private el: ElementRef) { }

  ngOnInit() {

    this.separadorDecimal = this.Mask.decimal || ',';
    //this.separadorMilhar = this.Mask.milhar || '.';
    this.prefixo = this.Mask.prefixo || 'R$';
    this.el.nativeElement.value = this.aplicarMascara(this.el.nativeElement.value);
  }

  writeValue(value: any): void {
    if (value) {
      if (!isNaN(value)) {
        value = value.toFixed(2);
      }
      console.log(value);
      this.el.nativeElement.value = this.aplicarMascara(String(value)).replace('.', "").replace(",", ".").replace("R$", "").trim();
      console.log(this.el.nativeElement.value);
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
    let valor: string = this.aplicarMascara($event.target.value);
    if (valor === '') {
      this.writeValue('');
      $event.target.value = '';
      return;
    }
    if (this.separadorDecimal === ',') {
      this.writeValue(valor.replace(/\./g, '').replace(',', '.'));
    } else {
      this.writeValue(valor.replace(/\,/g, ''));
    }

    $event.target.value = valor;
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    var pattern = '0' + this.separadorDecimal + '00';
    if ($event.target.value.indexOf(pattern) === -1) {
      return;
    }
  }

  /**
   * Aplica a máscara a determinado valor.
   *
   * @param string valorConverter
   * @return string
   */
  aplicarMascara(valorConverter: string): string {
    let valorNum = parseInt(valorConverter.replace(/\D/g, ''), 10);
    let valorMask = '';
    let valor: string;
    if (isNaN(valorNum)) {
      return '';
    }
    valor = valorNum.toString();
    switch (valor.length) {
      case 1:
        valorMask = '0' + this.separadorDecimal +
          '0' + valor;
        break;
      case 2:
        valorMask = '0' + this.separadorDecimal + valor;
        break;
      case 3:
        valorMask = valor.substr(0, 1) + this.separadorDecimal +
          valor.substr(1, 2);
        break;
      default:
        break;
    }
    if (valorMask === '') {
      let sepMilhar = 0;
      for (let i = (valor.length - 3); i >= 0; i--) {
        if (sepMilhar === 3) {
          valorMask = valorMask;
          sepMilhar = 0;
        }
        valorMask = valor.charAt(i) + valorMask;
        sepMilhar++;
      }
      valorMask = valorMask + this.separadorDecimal +
        valor.substr(valor.length - 2, 2);
    }
    if (this.prefixo !== '') {
      valorMask = this.prefixo + ' ' + valorMask;
    }

    return valorMask;
  }
}