import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        DetailRoutingModule,
        ButtonModule,
        RippleModule
    ],
    declarations: [
        DetailComponent
    ]
})
export class DetailModule { }
