import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaListar } from './listar/empresa-listar.component';
import { EmpresaSelecionar } from './selecionar/empresa-selecionar.component';
import { EmpresaGestao } from './menuGestao/empresa-gestao.component';
import { EmpresaEditar } from './editar/empresa-editar.component';
import { EmpresaSelecionarHome } from './selecionar/empresa-selecionar-home.component';
import { EmpresaExcluir } from './excluir/empresa-excluir.component';
import { EmpresaCadastrar } from './cadastrar/empresa-cadastrar.component';
import { EntidadeGestoraCadastrar } from '../entidadeGestora/cadastrar/entidadeGestora-cadastrar.component';
import { EntidadeGestoraExcluir } from '../entidadeGestora/excluir/entidadeGestora-excluir.component';
import { EntidadeGestoraSelecionar } from '../entidadeGestora/selecionar/entidadeGestora-selecionar.component';
import { MembrosComponent } from '../membros/editar/membros.component';
import { MembrosExcluir } from '../membros/excluir/membros.excluir.component';
import { UploadLogo } from '../empresa/uploadLogo/uploadLogo.component';
import { EmpresaResponsaveis } from '../empresa/menuResponsaveis/empresa-responsaveis.component'
import { ResponsavelAtualizacaoCadastrar } from '../responsavelAtualizacao/cadastrar/responsavelAtualizacao-cadastrar.component'
import { GerenciarListar } from '../gerenciar/listar/gerenciar-listar.component'
import { GerenciarCadastrar } from '../gerenciar/cadastrar/gerenciar-cadastrar.component'
import { GerenciarEditar } from '../gerenciar/editar/gerenciar-editar.component'
import { GerenciarExcluir } from '../gerenciar/excluir/gerenciar-excluir.component'
import { ResponsavelAtualizacaoExcluir } from '../responsavelAtualizacao/excluir/responsavelAtualizacao-excluir.component';
import { EntidadeGestoraEditar } from '../entidadeGestora/editar/entidadeGestora-editar.component';
import { RemuneracaoComponent } from '../remuneracao/remuneracao.component';
import { EmpresaDocumentos } from './menuDocumentos/empresa-documentos.component';
import { UploadDocumentoEmpresa } from './uploadDocumentoEmpresa/upload-documento-empresa.component';
import { AuthGuard } from '../../guards/auth.guard';
import { DeactivateGuard } from '../../guards/deactivate';



const empresaRoutes: Routes = [
    {
        path: 'empresa/cadastrar', component: EmpresaCadastrar,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        canDeactivate: [DeactivateGuard]
    },
    {
        path: 'empresa/cadastrar/upload', component: UploadLogo,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        canDeactivate: [DeactivateGuard]
    },
    {
        path: 'empresa', component: EmpresaListar,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'gerenciar', component: GerenciarListar,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'gerenciar/cadastrar', component: GerenciarCadastrar,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        canDeactivate: [DeactivateGuard]
    },

    {
        path: 'gerenciar/:id', component: GerenciarListar,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        children: [
            {
                path: 'excluir', component: GerenciarExcluir,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
        ]
    },
    {
        path: 'gerenciar/:id/editar', component: GerenciarEditar,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        canDeactivate: [DeactivateGuard]
    },



    {
        path: 'empresa/:id', component: EmpresaSelecionar,
        children: [
            { path: '', component: EmpresaSelecionarHome,
            canLoad: [AuthGuard],
            canActivate: [AuthGuard],
        },
            {
                path: 'gestao', component: EmpresaGestao, children: [
                    {
                        path: 'excluirEntidadeGestora/:id', component: EntidadeGestoraExcluir,
                        canActivate: [AuthGuard],
                        canLoad: [AuthGuard],
                    },
                ]
            },
            {
                path: 'editarEntidadeGestora/:id', component: EntidadeGestoraEditar,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            {
                path: 'responsaveis', component: EmpresaResponsaveis,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
                children: [
                    { path: 'excluirResponsavelInformacao/:id', component: ResponsavelAtualizacaoExcluir,
                 canActivate: [AuthGuard],
                 canLoad: [AuthGuard],
                 },
                ]
            },

            {
                path: 'responsaveis/:id', component: EmpresaResponsaveis,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            {
                path: 'documentos', component: EmpresaDocumentos,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
                children: [
                    { path: 'upload/:fkTipoDoc', component: UploadDocumentoEmpresa },
                ]
            },
            {
                path: 'cadastrarResponsavelInformacao/:id', component: ResponsavelAtualizacaoCadastrar,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            {
                path: 'editar', component: EmpresaEditar,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            {
                path: 'cadastrarEntidadeGestora', component: EntidadeGestoraCadastrar,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            {
                path: 'entidadeGestora/:id', component: EntidadeGestoraSelecionar,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            {
                path: 'upload', component: UploadLogo,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            {
                path: 'membro/:idEntidadeGestora/:idVaga/:idEmpresa', component: MembrosComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            {
                path: 'entidadeGestora/:idEntidadeGestora/membro/:id/excluir', component: MembrosExcluir,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            {
                path: 'entidadeGestora/:idEntidadeGestora/remuneracao', component: RemuneracaoComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },



        ]
    },
    {
        path: 'empresa/excluir/:id', component: EmpresaExcluir,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(empresaRoutes),
    ],

    exports: [
        RouterModule
    ]
})
export class EmpresaRoutingModule { }
