import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { WorkingHoursChartComponent } from '../../components/working-hours-chart/working-hours-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MinutesToTimePipe } from '../../utils/pipes/minutes-to-time/minutes-to-time';
import { LoadingOverlayModule } from '../../components/loading-overlay/loading-overlay.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxChartsModule,
    LoadingOverlayModule
  ],
  declarations: [DashboardPage, WorkingHoursChartComponent],
  providers: [DatePipe, MinutesToTimePipe]
})
export class DashboardPageModule {
}
