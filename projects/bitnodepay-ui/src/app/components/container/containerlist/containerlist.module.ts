import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerListRoutingModule } from './containerlist-routing.module';
import { ContainerListComponent } from './containerlist.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        ContainerListRoutingModule,
        ButtonModule,
        RippleModule
    ],
    declarations: [
        ContainerListComponent
    ]
})
export class ContainerListModule { }
