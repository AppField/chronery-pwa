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
    loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule'
  },
  {
    path: 'working-hours',
    loadChildren: './pages/working-hours/working-hours.module#WorkingHoursPageModule'
  },
  {
    path: 'report',
    loadChildren: './pages/report/report.module#ReportPageModule'
  },
  {
    path: 'projects',
    loadChildren: './pages/projects/projects.module#ProjectsPageModule'
  },
  {
    path: 'settings',
    loadChildren: './pages/settings/settings.module#SettingsPageModule'
  },
  {
    path: 'imprint',
    loadChildren: './pages/imprint/imprint.module#ImprintPageModule'
  },
  {
    path: 'authenticate',
    loadChildren: './pages/authenticate/authenticate.module#AuthenticatePageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
