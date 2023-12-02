import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AuthGuard } from './demo/components/authguard/authguard.component';

const routes: Routes = [
    // Rota de Login (acessível sem autenticação)
    {
        path: 'login',
        loadChildren: () => import('./demo/components/auth/login/login.module').then(m => m.LoginModule)
    },
    // Rota de Usuários (acessível sem autenticação)
    {
        path: 'register',
        loadChildren: () => import('./demo/components/auth/register/register.module').then(m => m.RegisterModule)
    },
    // Rota de Recuperação de Senha (acessível sem autenticação)
    {
        path: 'recovery',
        loadChildren: () => import('./demo/components/auth/recovery/recovery.module').then(m => m.RecoveryModule)
    },
    // Redirecionamento padrão para Dashboard
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    // Rotas protegidas por AuthGuard
    {
        path: '', 
        component: AppLayoutComponent,
        canActivate: [AuthGuard], // Aplicar o AuthGuard aqui
        children: [
            { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
            { path: 'venda', loadChildren: () => import('./demo/components/uikit/venda/venda.module').then(m => m.VendaModule) },
            { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
        ]
    },
    // Rota para página não encontrada
    { path: 'notfound', component: NotfoundComponent },
    // Redirecionamento para 'notfound' em caso de rota desconhecida
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
