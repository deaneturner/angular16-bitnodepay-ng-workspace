import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        CatalogRoutingModule,
        ButtonModule,
        DividerModule,
        RippleModule
    ],
    declarations: [CatalogComponent]
})
export class CatalogModule { }
