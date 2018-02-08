
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
    templateUrl: './gerenciar-cadastrar.html' 
})

export class GerenciarCadastrar implements OnChanges { 
    
    @Input() pessoa: Pessoa;
    pessoaForm: FormGroup;
    msgErro: string;
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
        this.pessoaForm = this.fb.group({ 
            numCpf: new FormControl(this.pessoa.numCpf, [Validators.required, CpfValidator()]),
            nmePessoa: new FormControl(this.pessoa.nmePessoa),
            dtaEmissaoRg: new FormControl(""), 
            emlInstitucional: new FormControl(this.pessoa.emlInstitucional),
            emlParticular: new FormControl(this.pessoa.emlParticular),
            numCelular: new FormControl(this.pessoa.numCelular),
            numTelefone: new FormControl(this.pessoa.numTelefone),
            orgEmissaoRg: new FormControl(this.pessoa.orgEmissaoRg),
            numRg: new FormControl(this.pessoa.numRg),
            tbUsuario: { id: 1 }
        });
    }

    ngOnChanges() {
    
    }

    onSubmit() {
        this.msgErro = "";
        if (!this.pessoaForm.invalid) {
            let formObj = this.pessoaForm.getRawValue();
            this.service.cadastrarPessoa(formObj).then(data => {
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

    cadastrar(){
        console.log("Cadastrando membro... voltando...")
        console.log(this.pessoa);
    }

    voltar() {
        this.location.back();
    }

}








