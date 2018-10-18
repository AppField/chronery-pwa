import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReportPage } from './report.page';
import { MinutesToTimeModule } from '../../utils/pipes/minutes-to-time/minutes-to-time.module';
import { EncodedDatePipe } from '../../utils/pipes/encoded-date/encoded-date.pipe';
import { UtcTimePipe } from '../../utils/pipes/utc-time/utc-time.pipe';

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
    RouterModule.forChild(routes)
  ],
  declarations: [
    ReportPage,
    EncodedDatePipe,
    UtcTimePipe
  ]
})
export class ReportPageModule {
}
