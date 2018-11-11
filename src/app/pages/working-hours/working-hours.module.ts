import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkingHoursPage } from './working-hours.page';
import { WorkCardComponent } from '../../components/work-card/work-card.component';
import { ProjectModalComponent } from '../../components/project-modal/project-modal.component';
import { FilterModule } from '../../utils/pipes/filter.module';
import { MinutesToTimeModule } from '../../utils/pipes/minutes-to-time/minutes-to-time.module';
import { TimeInputComponent } from '../../components/time-input/time-input.component';
import { LoadingOverlayModule } from '../../components/loading-overlay/loading-overlay.module';

const routes: Routes = [
  {
    path: '',
    component: WorkingHoursPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FilterModule,
    MinutesToTimeModule,
    LoadingOverlayModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WorkingHoursPage, WorkCardComponent, ProjectModalComponent, TimeInputComponent],
  entryComponents: [ProjectModalComponent],
  providers: [DatePipe]
})
export class WorkingHoursPageModule {
}
