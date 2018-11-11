import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReportPage } from './report.page';
import { MinutesToTimeModule } from '../../utils/pipes/minutes-to-time/minutes-to-time.module';
import { EncodedDatePipe } from '../../utils/pipes/encoded-date/encoded-date.pipe';
import { UtcTimePipe } from '../../utils/pipes/utc-time/utc-time.pipe';
import { MinutesToTimePipe } from '../../utils/pipes/minutes-to-time/minutes-to-time';
import { BtnReportPdfComponent } from '../../components/btn-report-pdf/btn-report-pdf.component';
import { LoadingOverlayModule } from '../../components/loading-overlay/loading-overlay.module';

const routes: Routes = [
  {
    path: '',
    component: ReportPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinutesToTimeModule,
    LoadingOverlayModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ReportPage,
    BtnReportPdfComponent,
    EncodedDatePipe,
    UtcTimePipe
  ],
  providers: [
    DatePipe,
    EncodedDatePipe,
    UtcTimePipe,
    MinutesToTimePipe
  ]
})
export class ReportPageModule {
}
