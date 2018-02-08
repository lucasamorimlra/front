
import { Component, OnChanges, Input } from '@angular/core';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CnpjValidator } from '../../../diretivas/validacaoCnpj.directive';
import { IFormCanDeactivate } from '../../../guards/form-deactivate';
@Component({
    templateUrl: './empresa-cadastrar.html',
    styleUrls: ['./empresa-cadastrar.css']
})



export class EmpresaCadastrar implements OnChanges, IFormCanDeactivate {
    @Input() empresa: Empresa;
    empresaForm: FormGroup;
    msgErro: string;
    private formMudou: boolean = false;
    constructor(
        private service: EmpresaService,
        private route: ActivatedRoute,
        private router: Router, private fb: FormBuilder) {
        this.criarFormulario();
    }
    ngOnInit(): void {
        console.log(this.service.getRandomInt());
        if (this.service.empresaRegister !== null
            && this.service.empresaRegister !== undefined) {
            console.log(this.service.empresaRegister);
            this.empresa = this.service.empresaRegister;
            this.empresaForm.setValue(this.service.empresaRegister);
        }
    }
    criarFormulario() {
        this.empresa = new Empresa();
        this.empresaForm = this.fb.group({
            numCnpj: new FormControl(this.empresa.numCnpj,
                [Validators.required, Validators.minLength(14), CnpjValidator()]),
            nmeEmpresa: new FormControl(this.empresa.nmeEmpresa, [
                Validators.required,
                Validators.minLength(5), Validators.maxLength(25)
            ]),
            sglEmpresa: new FormControl(this.empresa.sglEmpresa),
            codSiest: 9999,
            urlDominio: this.empresa.urlDominio,
            idLastUser:  1 ,
            id:0
        });


       
    }
    onSubmit() {
        let formObj = this.empresaForm.getRawValue();
        this.msgErro = "";
        console.log(this.service.getRandomInt())
        console.log(this.service.empresaRegister);
        if (!this.empresaForm.invalid) {
            let formObj = this.empresaForm.getRawValue();
            if (this.service.getRandomInt() === undefined) {
                this.service.cadastrarEmpresa(formObj).then(data => {
                    if (data["code"] == 201 || data["code"] == 200) {
                        this.router.navigate(['/empresa', data["id"]]);
                    } else {
                        this.msgErro = data["message"];
                    }
                });
            }
        }
    }

    displayModal(): void {
        this.service.empresaRegister = this.empresaForm.getRawValue();
        this.router.navigate(['/empresa/cadastrar/upload/']);

    }

    ngOnChanges() {
    }

    voltar() {
        this.router.navigate(['/empresa']);
    }

    onInput() {
        this.formMudou = true;
        console.log('mudou');
    }

    podeMudarRota() {

        if (this.formMudou) {
            return confirm('Tem certeza que deseja sair dessa página?');
        }

        return true;

    }

    podeDesativar() {
        return this.podeMudarRota();
    }


}








