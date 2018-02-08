import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MaskInput } from '../../diretivas/mascaraInput.directive';
import { MaskCurrencyDirective } from '../../diretivas/mascaraInputMoney.directive';
import { EmpresaListar } from './listar/empresa-listar.component';
import { EmpresaSelecionar } from './selecionar/empresa-selecionar.component';
import { EmpresaGestao } from './menuGestao/empresa-gestao.component';

// Services
import { EmpresaService } from '../../services/empresa.service';
import { TipoGestaoService } from '../../services/tipoGestao.service';
import { EntidadeGestoraService } from '../../services/entidadeGestora.service';
import { IndicanteService } from '../../services/indicante.service';
import { CargoService } from '../../services/cargo.service';
import { VagaService } from '../../services/vaga.service';
import { ResponsavelAtualizacaoService } from '../../services/responsavelAtualizacao.service';
import { TipoResponsabilidadeService } from '../../services/tipoResponsabilidade.service';
import { SegmentoInformacaoService } from '../../services/segmentoInformacao.service';
import { TipoDocumentoService } from '../../services/tipoDocumento.service';
import { DocumentoService } from '../../services/documento.service';
import { MetaEntidadeDocumentoService } from '../../services/metaEntidadeDocumento.service';
// Components
import { EmpresaSelecionarHome } from './selecionar/empresa-selecionar-home.component';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaEditar } from './editar/empresa-editar.component';
import { EmpresaExcluir } from './excluir/empresa-excluir.component';
import { EmpresaCadastrar } from './cadastrar/empresa-cadastrar.component';
import { MembrosComponent } from '../membros/editar/membros.component';
import { EntidadeGestoraCadastrar } from '../entidadeGestora/cadastrar/entidadeGestora-cadastrar.component';
import { EntidadeGestoraExcluir } from '../entidadeGestora/excluir/entidadeGestora-excluir.component';
import { EntidadeGestoraSelecionar } from '../entidadeGestora/selecionar/entidadeGestora-selecionar.component';
import { EmpresaResponsaveis } from '../empresa/menuResponsaveis/empresa-responsaveis.component';
import { ResponsavelAtualizacaoCadastrar } from '../responsavelAtualizacao/cadastrar/responsavelAtualizacao-cadastrar.component';
import { PessoaService } from '../../services/pessoa.service';
import { GerenciarListar } from '../gerenciar/listar/gerenciar-listar.component'
import { GerenciarCadastrar } from '../gerenciar/cadastrar/gerenciar-cadastrar.component'
import { GerenciarEditar } from '../gerenciar/editar/gerenciar-editar.component'
import { GerenciarExcluir } from '../gerenciar/excluir/gerenciar-excluir.component'
import { ResponsavelAtualizacaoExcluir } from '../responsavelAtualizacao/excluir/responsavelAtualizacao-excluir.component';
import { EntidadeGestoraEditar } from '../entidadeGestora/editar/entidadeGestora-editar.component';
import { RemuneracaoComponent } from '../remuneracao/remuneracao.component';
import { EmpresaDocumentos } from './menuDocumentos/empresa-documentos.component';
import { DeactivateGuard } from '../../guards/deactivate';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EmpresaRoutingModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [
    EmpresaListar, MaskInput, MaskCurrencyDirective, EmpresaSelecionar, GerenciarListar, GerenciarCadastrar, GerenciarEditar,
    EmpresaGestao, EmpresaSelecionarHome, EmpresaEditar, EmpresaExcluir, GerenciarExcluir, MembrosComponent,
    EmpresaCadastrar, EntidadeGestoraCadastrar, EntidadeGestoraExcluir, EmpresaDocumentos, EntidadeGestoraEditar, ResponsavelAtualizacaoExcluir, EntidadeGestoraSelecionar, EmpresaResponsaveis, ResponsavelAtualizacaoCadastrar,
    RemuneracaoComponent
  ],
  providers: [
    EmpresaService, 
    EntidadeGestoraService, 
    SegmentoInformacaoService, 
    PessoaService, 
    IndicanteService, 
    CargoService, 
    TipoGestaoService,
    VagaService, 
    TipoResponsabilidadeService, 
    ResponsavelAtualizacaoService, 
    TipoDocumentoService, 
    DocumentoService, 
    MetaEntidadeDocumentoService,
    DeactivateGuard,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MaskInput,
      multi: true
    }, {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MaskCurrencyDirective,
      multi: true
    }
  ]

})
export class EmpresaModule { }
