import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { LoginService } from '../demo/components/auth/login/login.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private loginService: LoginService) { }

    ngOnInit() {
        const userProfile = this.loginService.getUserProfile();
        console.log('userProfile', userProfile);
        console.log()
        const userSession = this.loginService.getToken();
        console.log('userSession', userSession);
    
        if(userSession){

            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                    ]
                },
                {
                    label: 'Menus',
                    items: [
                        { label: 'Doacao', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/doacao'] },
                        { label: 'Reciclagem', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/reciclagem'] },
                        { label: 'Ecocoins', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/ecocoins'] },
                        { label: 'Vendas', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/venda'] },
                    ]
                }
            ];
        
            if (userProfile === 'Vendedor') {
                this.model[1].items.push({ label: 'Cadastro de Produtos', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/produtos'] });
            } else if (userProfile === 'Comprador') {
                // Adicionar itens específicos para comprador
                // Exemplo: this.model[1].items.push({ label: 'Item Comprador', icon: 'pi pi-fw pi-user', routerLink: ['/uikit/comprador'] });
            }
        }

        }
      

    
}
