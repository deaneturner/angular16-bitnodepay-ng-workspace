import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContainerListComponent } from './containerlist.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ContainerListComponent }
    ])],
    exports: [RouterModule]
})
export class ContainerListRoutingModule { }
