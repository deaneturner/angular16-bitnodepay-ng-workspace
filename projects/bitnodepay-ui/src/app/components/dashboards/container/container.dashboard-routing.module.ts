import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContainerDashboardComponent } from './container.dashboard.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ContainerDashboardComponent }
	])],
	exports: [RouterModule]
})
export class ContainerDashboardRoutigModule { }
