import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectsPage } from './projects.page';
import { FilterModule } from '../../utils/pipes/filter.module';
import { LoadingOverlayModule } from '../../components/loading-overlay/loading-overlay.module';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterModule,
    LoadingOverlayModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProjectsPage]
})
export class ProjectsPageModule {
}
