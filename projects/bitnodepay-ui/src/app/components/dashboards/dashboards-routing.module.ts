import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', data: {breadcrumb: 'Network Dashboard'}, loadChildren: () => import('./container/container.dashboard.module').then(m => m.ContainerDashboardModule) },

    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
