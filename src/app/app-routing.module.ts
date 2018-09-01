import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardPageModule'
  },
  {
    path: 'working-hours',
    loadChildren: './working-hours/working-hours.module#WorkingHoursPageModule'
  },
  {
    path: 'report',
    loadChildren: './report/report.module#ReportPageModule'
  },
  {
    path: 'projects',
    loadChildren: './projects/projects.module#ProjectsPageModule'
  },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsPageModule'
  },
  {
    path: 'imprint',
    loadChildren: './imprint/imprint.module#ImprintPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
