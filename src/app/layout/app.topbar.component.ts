import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { LoginService } from '../demo/components/auth/login/login.service';
import { UserService } from '../demo/services/user/user.service';
import { UsersDTO } from '../demo/models/users.dto';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.css']
})
export class AppTopBarComponent implements OnInit{
    items!: MenuItem[];
    ecocoins: number = 0;
    exibirDialogo: boolean = false;
    usuario: UsersDTO | null = null;


    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService, 
        private loginService: LoginService,
        private userService: UserService,
        private router: Router
        ) { }

        ngOnInit() {
            this.atualizarEcoCoins();
        }
    
        atualizarEcoCoins() {
            this.userService.obterInformacoesUsuarioLogado().subscribe(
                user => {
                    this.ecocoins = user.ecocoins;
                },
                error => {
                    console.error('Erro ao obter informações do usuário', error);
                }
            );
        }

    showUserInfo() {
        const userId = this.loginService.getUserId();
        this.userService.obterUser(userId).subscribe(
            user => {
                this.usuario = user;
                this.usuario.name = user.name;
                this.usuario.email = user.email;
                this.usuario.ecocoins = user.ecocoins;
                this.exibirDialogo = true; // Abre o diálogo
            },
            error => {
                console.error('Erro ao obter informações do usuário', error);
            }
        );
       
    }



    fecharDialogo() {
        this.exibirDialogo = false; // Fecha o diálogo
    }

    public logout(): void {
        // Remover o token específico
        this.loginService.removerTokenLocalStorage();
    
        // Remover outras informações do usuário do localStorage
        localStorage.removeItem('userProfile');
        localStorage.removeItem('userId');
        // Adicione aqui qualquer outra informação específica que você queira remover
    
        // Alternativamente, se quiser limpar tudo do localStorage
        // localStorage.clear();
    
        // Redirecionar para a tela de login ou realizar outras ações de logout necessárias
        this.router.navigate(['/login']);
    }
    
}
