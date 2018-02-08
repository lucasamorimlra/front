
import { Component } from '@angular/core';
import { MenuLateral } from './menu-lateral';
import { MenuItem } from 'primeng/components/common/api';




@Component({

    selector: 'menuLateral',
    templateUrl: './menu-lateral.html',
    styleUrls: ['./menu-lateral.css']
})



export class MenuLateralComponent {
    items: MenuItem[] = [
        {
            label: 'Home',
            routerLink: ['/home'],
            icon: 'fas fa-home'
        },
        {
            label: 'Empresas',
            routerLink: ['/empresa'],
            icon: 'fas fa-building'
        },
        {
            label: 'Gerenciar',
            routerLink: ['/gerenciar'],
            icon: 'fas fa-cogs'
        }
    ];

    ngOnInit() {
        this.items;
    }
}



