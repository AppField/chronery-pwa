import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReportPage } from './report.page';
import { MinutesToTimeModule } from '../../utils/pipes/minutes-to-time/minutes-to-time.module';

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
  declarations: [ReportPage]
})
export class ReportPageModule {
}
