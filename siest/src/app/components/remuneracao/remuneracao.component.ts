import { Component, OnChanges, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Remuneracao } from '../../models/remuneracao';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VagaService } from '../../services/vaga.service';
import { PessoaService } from '../../services/pessoa.service'

@Component({
    templateUrl: '/remuneracao.component.html',
    styleUrls: ['../membros/editar/membros.component.css']
})

export class RemuneracaoComponent {

    vagas: Array<any>;
    entidade: Array<any>;
    repeteRemu: Array<any>;
    checkboxPadrao: Array<any>;
    checkboxRemuneracao: Array<any>;
    repetePadrao: Array<any>;
    remuneracoes: Array<any>;
    @Input() remuneracao: Array<any>;
    @Input() dataRemuneracao: string;
    @Input() dataRemuneracaoAlias: string;

    constructor(
        private route: ActivatedRoute,
        private vagService: VagaService,
        private servicePessoa: PessoaService,
        private fb: FormBuilder,
        private router: Router, 
        private location: Location) {
    }

    ngOnInit(): void {
     
        this.initialize();
        let segments = this.router.url.split('/');
        this.remuneracoes = [];
        this.vagService.consultarVagaCompleta(segments[4]).then(data => {
            this.vagas = data.taMembroOcupaVagas;
            this.entidade = data;
            console.log(data);
            data.taMembroOcupaVagas.forEach((obj) => {
                
            var strRemu = ""; 

                this.vagService.consultarRemuneracao(obj.id).then(remus => {

                    var remuId = obj.id;
                    console.log(remus);
                    if(remus.length > 0)
                    {

                         var remId = "";
                        remus.forEach((remuneracao) => {

                            remId = remuneracao.id;

                            strRemu  = strRemu + '<p class="fw900 font1 valor-remuneracoes">' + remuneracao.dtaRemuneracao + ' R$ ' + remuneracao.vlrRemuneracao + '</p>';

                        });
                      
                        this.remuneracoes['membro'+remuId] = {id: remId, str: strRemu};
                    }
                    else
                    {
                        this.remuneracoes['membro'+remuId] = {id: 'null', str: '<p class="fw900 font1 valor-remuneracoes">Sem remuneração anterior</p>'};
                    }

                });

            console.log(obj);
            console.log(this.remuneracoes);

            });
        });

    }

    cadastraRemuneracoes()
    {
    
        let segments = this.router.url.split('/');
        this.vagService.consultarVagaCompleta(segments[4]).then(data => {

            data.taMembroOcupaVagas.forEach((obj,index) => {
            

                this.vagService.consultarRemuneracaoData(obj.id,this.dataRemuneracaoAlias).then(remus => {

                    if(remus.length <= 0 || typeof remus.length == "undefined")
                    {

                        if(this.remuneracao[index]['valor'] != "" && this.dataRemuneracaoAlias != "" && this.remuneracao[index]['valor'] != "undefined" && this.dataRemuneracaoAlias != "undefined")
                        {

                        console.log(this.remuneracao[index])
                            var remuJson = '{"taMembroOcupaVaga": { "id": "'+obj.id+'" }, "tbUsuario": { "id": "1" }, "vlrRemuneracao": "'+this.remuneracao[index]['valor']+'", "dtaRemuneracao": "'+this.dataRemuneracaoAlias +'"}';

                            this.vagService.cadastraRemuneracao(JSON.parse(remuJson));
                            this.voltar();
                        }
  
                    }
                    else
                    {

                            if(this.remuneracao[index]['valor'] != "" && this.dataRemuneracaoAlias != "" && this.remuneracao[index]['valor'] != "undefined" && this.dataRemuneracaoAlias != "undefined")
                            {
                                var remuJson = '{"id": "'+this.remuneracao[index]['id']+'", "vlrRemuneracao": "'+this.remuneracao[index]['valor']+'", "dtaRemuneracao": "'+this.dataRemuneracaoAlias +'"}';
                                this.vagService.atualizaRemuneracao(JSON.parse(remuJson));
                                this.voltar();
                            }  
   
                    }


                });

            });

        });
    }

    initialize()
    {

        this.remuneracao = [];
        this.checkboxPadrao = [];
        this.repeteRemu = [];
        this.repetePadrao = [];
        this.checkboxRemuneracao = [];
        var nb:number;

        for (nb = 0; nb < 50; nb++) {

            this.remuneracao.push({"id":"","value":""});
            this.checkboxPadrao.push(false);
            this.repeteRemu.push(true);
            this.repetePadrao.push(true);
            this.checkboxRemuneracao.push(false);
         }

    }

    repeteTodasRemuneracoes(padrao)
    {

         this.vagas.forEach((vaga,index) => {

            console.log(vaga);

            if(padrao !== false)
            {
                this.repetirRemuneracaoPadrao(index,padrao,false,this.remuneracoes['membro'+vaga.id]['id']);
            }
            else
            {
                this.repetirRemuneracao(index,vaga.id,false,this.remuneracoes['membro'+vaga.id]['id']);
            }

         });
    }

    repetirRemuneracao(i,id,ignore = false,id_rem)
    {
        if(this.repeteRemu[i] == true || ignore == true)
        {
            this.vagService.consultarUltimaRemuneracao(id).then(remus => {   
            
                this.update(i,remus[0].vlrRemuneracao,id_rem);
                this.repeteRemu[i] = false;
                this.checkboxRemuneracao[i] = true;

            });
        }
        else if(ignore == false)
        {
            this.update(i,"",id_rem);
            this.repeteRemu[i] = true;
            this.checkboxRemuneracao[i] = false;
        }

    }

    repetirRemuneracaoPadrao(i,value,ignore = false,id_rem)
    {

        
        if(this.repetePadrao[i] == true || ignore == true)
        {
            this.update(i,this.entidade['vlrRemuneracaoBase'],id_rem);
            this.repetePadrao[i] = false;
            this.checkboxPadrao[i] = true;
        }
        else if(ignore == false)
        {
            this.update(i,"",id_rem);
            this.repetePadrao[i] = true;
            this.checkboxPadrao[i] = false;
        }
    }

    update(i: number, value, id)
    {
        if(typeof value == "string" && value !== "")
        {
            var str = value.replace(/[^\/\d]/g,'');
            var semiValor = str.substring(0,str.length-2)+"."+str.substring(str.length-2);
            var valor:any = parseFloat(semiValor);
        }
        else if(value === "")
        {
            var valor:any = value;
        }
        else
        {
            var valor:any = value;
        }
      this.remuneracao[i] = {valor,id};
      console.log(this.remuneracao)

    }

    updateData(data)
    {
        var mes = data.split('-')[1];
        
        if(mes == 1)
        {
            mes = "Janeiro";
        }
        else if(mes == 2)
        {
            mes = "Fevereiro";
        }
        else if(mes == 3)
        {
            mes = "Marco";
        }
        else if(mes == 4)
        {
            mes = "Abril";
        }
        else if(mes == 5)
        {
            mes = "Maio";
        }
        else if(mes == 6)
        {
            mes = "Junho";
        }
        else if(mes == 7)
        {
            mes = "Julho";
        }
        else if(mes == 8)
        {
            mes = "Agosto";
        }
        else if(mes == 9)
        {
            mes = "Setembro";
        }
        else if(mes == 10)
        {
            mes = "Outubro";
        }
        else if(mes == 11)
        {
            mes = "Novembro";
        }
        else if(mes == 12)
        {
            mes = "Dezembro";
        }

        this.dataRemuneracao = data;
        this.dataRemuneracaoAlias = mes + " " + data.split('-')[0];
    }

   voltar() {
        this.location.back();

    }
  
}

