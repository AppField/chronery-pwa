import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthenticatePage } from './authenticate.page';
import { LoadingOverlayModule } from '../../components/loading-overlay/loading-overlay.module';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoadingOverlayModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthenticatePage]
})
export class AuthenticatePageModule {
}
