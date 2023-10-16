import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContainerCatalogComponent } from './container-catalog.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ContainerCatalogComponent }
    ])],
    exports: [RouterModule]
})
export class ContainerCatalogRoutingModule { }
