import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerCatalogRoutingModule } from './container-catalog-routing.module';
import { ContainerCatalogComponent } from './container-catalog.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        ContainerCatalogRoutingModule,
        ButtonModule,
        DividerModule,
        RippleModule
    ],
    declarations: [ContainerCatalogComponent]
})
export class ContainerCatalogModule { }
