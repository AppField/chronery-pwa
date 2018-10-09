import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkingHoursPage } from './working-hours.page';
import { WorkCardComponent } from '../../components/work-card/work-card.component';
import { ProjectModalComponent } from '../../components/project-modal/project-modal.component';
import { MinutesToTimePipe } from '../../utils/pipes/minutes-to-time';
import { FilterPipe } from '../../utils/pipes/filter.pipe';

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
    RouterModule.forChild(routes)
  ],
  declarations: [WorkingHoursPage, MinutesToTimePipe, WorkCardComponent, ProjectModalComponent, FilterPipe],
  entryComponents: [ProjectModalComponent]
})
export class WorkingHoursPageModule {
}
