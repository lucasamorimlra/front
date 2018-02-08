
import { Component } from '@angular/core';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { OnInit, HostBinding, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, ResolveEnd } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import { Event } from '@angular/router';
import { NavigationEnd } from '@angular/router';


@Component({
    templateUrl: './empresa-selecionar.html',
    styleUrls: ['./empresa-selecionar.css']
})



export class EmpresaSelecionar implements OnInit {

    private selecionadoID: number;
    empresa: Empresa;
    logo: String;
    constructor(private service: EmpresaService,
        private route: ActivatedRoute,
        private router: Router) {

    }
    ngOnInit(): void {
        const me = this;
        console.log(this.router.url);
        this.atualizar();
        this.router.events.subscribe(
            (value: Event) => { 
                if (this.router.url == '/empresa/'.concat(this.selecionadoID + "")) {
                    this.service.consultarLogoPorId(this.selecionadoID).then(function (data) {
                        me.logo = data.fileAsBase64;
                        me.atualizar();
                    }
                    );
                } else {
                    console.log('teste')
                }
            });
    }

    ngAfterViewInit(): void {
        this.atualizar();
    }
    atualizar() {
        this.route.params.subscribe(params => {
            this.selecionadoID = +params['id'];
            if (this.selecionadoID != 0){
                this.service.consultarEmpresaPorId(this.selecionadoID).then((empresa: Empresa) => {
                    this.empresa = empresa
                });
                this.service.consultarLogoPorId(this.selecionadoID).then(
                    data => this.logo = data.fileAsBase64
                );
            } else {
                this.service.consultarEmpresaPorId(3).then((empresa: Empresa) => {
                    this.empresa = empresa
                });
                                this.service.consultarLogoPorId(3).then(
                                    data => this.logo = data.fileAsBase64
                                );
            }

        });
    }

    getBackgroundImage() {
        let styleWithImage = {
            'background-image': "url('data:image/png;base64," + this.logo + "')",
            'background-size': "contain",
            'background-repeat': "no-repeat",
            'background-position': 'center',
            'background-color': 'ffffff'
        };
        return styleWithImage;
    }

    voltar() {
        this.router.navigate(['/empresa']);
    }


    testarUrlValida() {
        let verificarURL: string = this.router.url;
        if (verificarURL.indexOf("/gestao") > -1 || verificarURL.indexOf("/entidadeGestora") > -1 || verificarURL.indexOf("/membro") > -1
            || verificarURL.indexOf("/cadastrarEntidadeGestora") > -1 || verificarURL.indexOf("/editarEntidadeGestora") > -1) {
            return true;
        }
        return false;
    }

}








