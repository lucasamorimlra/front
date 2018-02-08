
import { Component, OnChanges, Input } from '@angular/core';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CnpjValidator } from '../../../diretivas/validacaoCnpj.directive';
import { Location } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {UploadLogo} from '../uploadLogo/uploadLogo.component'

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ EmpresaEditar, UploadLogo ],
    bootstrap:    [ EmpresaEditar ]
  })
 
@Component({
    templateUrl: './empresa-editar.html',
    styleUrls: ['./empresa-editar.css'],
})

export class EmpresaEditar implements OnChanges {
    private selecionadoID: number;
    @Input() empresa: Empresa;
    empresaForm: FormGroup;
    msgErro: string;
    msgSucess: string;

    constructor(      private service: EmpresaService,
        private route: ActivatedRoute,
        private router: Router, private fb: FormBuilder, private location: Location) {
        this.criarFormulario();
    }

    displayModal(): void {

        this.router.navigate(['/empresa/'+this.selecionadoID+"/upload/"]);

    }

    criarFormulario(): void {

        this.empresa = new Empresa();
        this.selecionadoID = +this.router.url.replace("/empresa/", "").replace("/editar", "");
        this.service.consultarEmpresaPorId(this.selecionadoID).then(data => {
            data.forEach(empresa => {
                this.empresa = new Empresa(
                    empresa.id,
                    empresa.numCnpj,
                    empresa.nmeEmpresa,
                    empresa.sglEmpresa,
                    empresa.codSiest,
                    empresa.urlDominio
                );
            });

            this.empresaForm = this.fb.group({
                id: this.empresa.id,
                numCnpj: this.empresa.numCnpj,
                nmeEmpresa: this.empresa.nmeEmpresa,
                sglEmpresa: this.empresa.sglEmpresa,
                codSiest: this.empresa.codSiest,
                urlDominio: new FormControl(this.empresa.urlDominio),

                tbUsuario: { id: 1 }
            });


        });
        this.empresaForm = this.fb.group({
            urlDominio: new FormControl(this.empresa.urlDominio)

        });

    }
    ngOnChanges() {
    }

    voltar() {
        this.location.back();
    }

    onSubmit() {
        let formObj = this.empresaForm.getRawValue();
        this.msgErro = "";
        if (!this.empresaForm.invalid) {
            let formObj = this.empresaForm.getRawValue();
            this.service.atualizarEmpresa(formObj).then(data => {
                if (data["code"] == 201 || data["code"] == 200) {
                    this.router.navigate(['../'], { relativeTo: this.route });
                    window.location.reload();
                } else {
                    this.msgErro = data["message"];
                }
            });
        }
    }
}








