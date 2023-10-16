import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerDashboardComponent } from './container.dashboard.component';
import { ContainerDashboardRoutigModule } from './container.dashboard-routing.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { KnobModule } from 'primeng/knob';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { CarouselModule } from 'primeng/carousel';
import { ProgressBarModule } from 'primeng/progressbar';
import { AvatarModule } from 'primeng/avatar';
import { TimelineModule } from 'primeng/timeline';
import { BadgeModule } from 'primeng/badge';
import {LogsComponent} from "../../xterm/logs/logs.component";

@NgModule({
	imports: [
		CommonModule,
		ContainerDashboardRoutigModule,
		ButtonModule,
		RippleModule,
		DropdownModule,
		FormsModule,
		TableModule,
		InputTextModule,
		InputTextareaModule,
		ChartModule,
		RatingModule,
		KnobModule,
		CarouselModule,
		ProgressBarModule,
		AvatarModule,
		TimelineModule,
		BadgeModule
	],
	declarations: [ContainerDashboardComponent, LogsComponent]
})
export class ContainerDashboardModule { }
