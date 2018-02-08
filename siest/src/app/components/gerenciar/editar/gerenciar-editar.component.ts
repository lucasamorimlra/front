
import { Component, OnChanges, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
import { Pessoa } from '../../../models/pessoa';
import { PessoaService }  from '../../../services/pessoa.service'
import { CpfValidator } from '../../../diretivas/validacaoCpf.directive';

@Component({
    templateUrl: './gerenciar-editar.html' 
})

export class GerenciarEditar implements OnChanges { 
    
    @Input() pessoa: Pessoa;
    pessoaForm: FormGroup;
    msgErro: string;
    idSelecionado: number;
    constructor( 
        private service: PessoaService,
        private route: ActivatedRoute, 
        private router: Router, private fb: FormBuilder, private location: Location,
        ) { 
        this.criarFormulario();
    }
    ngOnInit() {
       
    }
    criarFormulario() {
        this.pessoa = new Pessoa();
        this.idSelecionado = +this.router.url.replace("/gerenciar/", "").replace("/editar", "");
        this.service.consultarPessoaPorId(this.idSelecionado).then(
            data => {
                this.pessoa = data[0]
                this.createForm(true);
            }
        );
        //This one has to be called, otherwise angular will complain about not initializing the form
        this.createForm(false);
    }

    createForm(setDefaultValues: boolean){
        this.pessoaForm = this.fb.group({
            numCpf: new FormControl(this.pessoa.numCpf, [Validators.required, CpfValidator()]), 
            nmePessoa: setDefaultValues ? this.pessoa.nmePessoa : new FormControl(this.pessoa.nmePessoa),
            dtaEmissaoRg: setDefaultValues ? this.pessoa.dtaEmissaoRg : new FormControl(this.pessoa.dtaEmissaoRg),
            emlInstitucional: setDefaultValues ? this.pessoa.emlInstitucional : new FormControl(this.pessoa.emlInstitucional),
            emlParticular: setDefaultValues ? this.pessoa.emlParticular : new FormControl(this.pessoa.emlParticular),
            numCelular: setDefaultValues ? this.pessoa.numCelular : new FormControl(this.pessoa.numCelular),
            numTelefone: setDefaultValues ? this.pessoa.numTelefone : new FormControl(this.pessoa.numTelefone),
            orgEmissaoRg: setDefaultValues ? this.pessoa.orgEmissaoRg : new FormControl(this.pessoa.orgEmissaoRg),
            numRg: setDefaultValues ? this.pessoa.numRg : new FormControl(this.pessoa.numRg), 
            tbUsuario: { id: 1 }
        });
    }

    ngOnChanges() {
        console.log('changes');
    }

    onSubmit() {
        this.msgErro = "";
        if (!this.pessoaForm.invalid) {
            let formObj = this.pessoaForm.getRawValue();
            formObj["id"] = this.idSelecionado;
            this.service.editarPessoa(formObj).then(data => {
                if (data["code"] == 201 || data["code"] == 200) {
                    this.router.navigate(['/gerenciar']);
                } else {
                    this.msgErro = data["message"]; 
                }
            });
        } else {
            this.msgErro = "Formulário inválido. Reveja o preenchimento dos campos e a validade do CPF.";
        }
    }

    buscarPessoaPorCPF(){
        this.service.listarPessoasPorCPF(this.pessoaForm.getRawValue()["numCpf"]).then(
            data => {
                if (data[0]){
                    data.forEach(pessoa => {
                        const cpf = pessoa.numCpf;
                        console.log(cpf);
                        this.pessoaForm = this.fb.group({
                            numCpf: new FormControl(this.pessoa.numCpf, [Validators.required, CpfValidator()]),
                            nmePessoa: pessoa.nmePessoa,
                            dtaEmissaoRg: pessoa.dtaEmissaoRg,
                            emlInstitucional: pessoa.emlInstitucional,
                            emlParticular: pessoa.emlParticular,
                            numCelular: pessoa.numCelular, 
                            numTelefone: pessoa.numTelefone,
                            orgEmissaoRg: pessoa.orgEmissaoRg,
                            numRg: pessoa.numRg,
                            tbUsuario: { id: 1 }
                        });
                        this.pessoa = pessoa;
                    });
                }
            }
        )
    }
    voltar() {
        this.location.back();
    }

}








