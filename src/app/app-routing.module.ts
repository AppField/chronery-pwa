import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule'
  },
  {
    path: 'working-hours',
    canActivate: [AuthGuard],
    loadChildren: './pages/working-hours/working-hours.module#WorkingHoursPageModule'
  },
  {
    path: 'report',
    canActivate: [AuthGuard],
    loadChildren: './pages/report/report.module#ReportPageModule'
  },
  {
    path: 'projects',
    canActivate: [AuthGuard],
    loadChildren: './pages/projects/projects.module#ProjectsPageModule'
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
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
