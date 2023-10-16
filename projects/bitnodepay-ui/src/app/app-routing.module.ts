import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./components/dashboards/dashboards.module').then(m => m.DashboardsModule) },
            { path: 'pages', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule) },
            { path: 'profile', data: { breadcrumb: 'User Management' }, loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule) },
            { path: 'documentation', data: { breadcrumb: 'Documentation' }, loadChildren: () => import('./components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'container', data: { breadcrumb: 'Node Network' }, loadChildren: () => import('./components/container/container.module').then(m => m.ContainerModule) },
            { path: 'apps', data: { breadcrumb: 'Apps' }, loadChildren: () => import('./components/apps/apps.module').then(m => m.AppsModule) }
        ]
    },
    { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', loadChildren: () => import('./components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
