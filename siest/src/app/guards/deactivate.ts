import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { EmpresaCadastrar } from '../components/empresa/cadastrar/empresa-cadastrar.component';
import { IFormCanDeactivate } from './form-deactivate';

@Injectable()
export class DeactivateGuard implements CanDeactivate<IFormCanDeactivate> {
                
        canDeactivate(
            component: IFormCanDeactivate,
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Observable<boolean>|Promise<boolean>|boolean {

            console.log('guarda de desativação');

            //return component.podeMudarRota ? component.podeMudarRota() : true;
            return component.podeDesativar ? component.podeDesativar() : true;
    }
}