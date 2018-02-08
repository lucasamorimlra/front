import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OnInit } from '@angular/core';
import { DataHelper } from '../app/helpers/dataHelper'
import { AppSiest } from './components/principal/principal';
import { PageNotFoundComponent } from './components/principal/not-found.component'
import { HomeComponent } from './components/principal/home.component'
import { MenuLateralComponent } from './components/menuLateral/menu-lateral-component';
import { MenuSuperiorComponent } from './components/menuSuperior/menu-superior-component';
import { EmpresaModule } from './components/empresa/empresa.module';
import { MembrosExcluir } from './components/membros/excluir/membros.excluir.component';
import { HttpClientModule } from '@angular/common/http';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { UploadLogo } from './components/empresa/uploadLogo/uploadLogo.component';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { MembrosComponent } from './components/membros/editar/membros.component';
import { UploadDocumentoEmpresa } from './components/empresa/uploadDocumentoEmpresa/upload-documento-empresa.component';
import { ServerRequest } from './helpers/serverRequest';
import { Login } from './components/principal/login/login.component';
import { ButtonModule } from 'primeng/primeng';
import { SlideMenuModule, MenuItem } from 'primeng/primeng';
import { PanelMenuModule } from 'primeng/components/panelmenu/panelmenu';
import { InputTextModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { AuthGuard } from './guards/auth.guard';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Ng2Webstorage } from 'ngx-webstorage';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './components/principal/login/auth.service';
import { DeactivateGuard } from './guards/deactivate';

export function config() {
  const dropzone: any = this;
  document.querySelector('button').addEventListener('click', (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dropzone.processQueue();
  });
}

const DROPZONE_CONFIG: DropzoneConfigInterface = {

  url: 'http://34.211.98.29:8090/siest/documento/upload', // Change this to your upload POST address:
  parallelUploads: 500,
  autoProcessQueue: false,
  init: config
};


const appRoutes: Routes = [{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
},
{
  path: "home", component: HomeComponent,
  canActivate: [AuthGuard],
  canLoad: [AuthGuard],
},
{
  path: 'login', component: Login
},
{ path: '**', component: PageNotFoundComponent },

];

@NgModule({
  declarations: [
    AppSiest, MenuLateralComponent, MenuSuperiorComponent
    , PageNotFoundComponent, HomeComponent, UploadLogo, UploadDocumentoEmpresa, MembrosExcluir, Login],
  imports: [
    PanelMenuModule, BrowserAnimationsModule, FormsModule, Ng2Webstorage,
    BrowserModule, RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true
      } // <-- debugging purposes only
    ), HttpClientModule, EmpresaModule, ButtonModule,
    DropzoneModule.forRoot(DROPZONE_CONFIG), CommonModule, ReactiveFormsModule,
  ],
  providers: [
    DataHelper,
    ServerRequest,
    AuthService,
    AuthGuard,
    DeactivateGuard

  ],
  bootstrap: [AppSiest]
})
export class AppModule {
  DROPZONE_CONFIG
}
