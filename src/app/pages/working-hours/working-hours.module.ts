import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkingHoursPage } from './working-hours.page';
import { WorkCardComponent } from '../../components/work-card/work-card.component';
import { ProjectModalComponent } from '../../components/project-modal/project-modal.component';

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
    RouterModule.forChild(routes)
  ],
  declarations: [WorkingHoursPage, WorkCardComponent, ProjectModalComponent],
  entryComponents: [ProjectModalComponent]
})
export class WorkingHoursPageModule {
}
