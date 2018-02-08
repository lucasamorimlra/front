
import { Component } from '@angular/core';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { ResponsavelAtualizacaoService } from '../../../services/responsavelAtualizacao.service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { ResponsavelAtualizacao } from '../../../models/responsavelAtualizacao';
import { SegmentoInformacao } from '../../../models/segmentoInformacao';
import { SegmentoInformacaoService } from '../../../services/segmentoInformacao.service';


@Component({
  templateUrl: './empresa-responsaveis.html',
  styleUrls: ['./empresa-responsaveis.css']
})

export class EmpresaResponsaveis implements OnInit {
  private selecionadoID: number;
  listaResponsaveis: Array<ResponsavelAtualizacao>;
  empresa: Empresa;
  segId: number;
  listaSegmentoInformacao: Array<SegmentoInformacao>;
  constructor(private serviceEmpresa: EmpresaService,
    private responsavelAtualizacaoService: ResponsavelAtualizacaoService,
    private segmentoInformacaoService: SegmentoInformacaoService,
    private route: ActivatedRoute,
    private router: Router) {

  }
  ngOnInit(): void {
    this.segId;
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.segId = +params['id'];
      }
    });
    this.listaSegmentoInformacao = [];
    let indexOf = this.router.url.replace("/empresa/", "").indexOf("/");
    this.selecionadoID = +this.router.url.replace("/empresa/", "").substr(0, indexOf);
    this.serviceEmpresa.consultarEmpresaPorId(this.selecionadoID).then(data => {
      this.empresa = this.serviceEmpresa.carregarEmpresa(data);
    });

    this.segmentoInformacaoService.listarSegmentoInformacao().then(data => {
      data.forEach(segmento => {
        this.listaSegmentoInformacao.push(
          new SegmentoInformacao(segmento.id, segmento.nmeSeguimentoInformacao)
        )
      });
    });
    const me = this;
    this.router.events.subscribe(
      /*   (value: Event) => {
           if (this.router.url == '/empresa/'.concat(this.selecionadoID + "")) {
             this.service.consultarLogoPorId(this.selecionadoID).then(function (data) {
               me.
               me.atualizar();
             }
             );
           } else {
   
           }}*/
    );


  }
  buscarPorSegmento() {
    this.listaResponsaveis = [];
    this.responsavelAtualizacaoService.listarResponsavelAtualizacaoPorEmpresaESegmentoInformacao(this.selecionadoID, this.segId).then(data => {
      if (JSON.stringify(data) !== JSON.stringify({})) {
        this.listaResponsaveis = this.responsavelAtualizacaoService.carregarResponsaveisAtualizacao(data);
      }
    });
  }

  voltar() {
    this.router.navigate(['/empresa', this.selecionadoID]);
  }
}








