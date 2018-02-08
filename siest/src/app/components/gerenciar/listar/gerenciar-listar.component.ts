
import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Pessoa } from '../../../models/pessoa';
import { PessoaService }  from '../../../services/pessoa.service'

@Component({
    templateUrl: './gerenciar-listar.html' 
})

export class GerenciarListar implements OnInit { 
    
    pessoas : Pessoa[];
    constructor(
        private service: PessoaService,
        private route: ActivatedRoute, 
        private router: Router, private fb: FormBuilder, private location: Location,
        ) { 
        this.criarFormulario();
    }
    ngOnInit() {
       this.listarPessoas();
    }

    listarPessoas() {
        this.pessoas = new Array<Pessoa>();
        this.service.listarPessoas().then(
            data => {
                console.log(data);
                data.forEach(pessoa => {
                this.pessoas.push(new Pessoa( 
                    pessoa.id,
                    pessoa.numCpf, 
                    pessoa.nmePessoa,
                    pessoa.dtaEmissaoRG,
                    pessoa.orgEmissaoRG,
                    pessoa.numTelefone,
                    pessoa.numCelular,
                    pessoa.emlParticular,
                    pessoa.emlInstitucional,
                   ));
            })
        }); 
    }

    criarFormulario() {
      
    }

    onSubmit() {
        
    }
 
    deletarPessoa(index: number){
        this.router.navigate(['/gerenciar/'+this.pessoas[index].id+'/excluir']);
        /*
        console.log('id p excluir: ' + this.pessoas[index].id);
        const jsonPessoa: any = {"id": this.pessoas[index].id};
        this.service.deletarPessoa(<JSON>jsonPessoa).then(
            response => {
                if (response["code"] && response["code"] === 200){
                    this.pessoas.splice(index, 1);
                }
            }
        );
        */
    }

    editarPessoa(index: number){
        this.router.navigate(['/gerenciar/'+this.pessoas[index].id+'/editar']);
    }

    cadastrar(){
        this.router.navigate(['/gerenciar/cadastrar']);
    }

    voltar() {
        this.location.back();
    }

}








