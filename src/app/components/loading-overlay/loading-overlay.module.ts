import { NgModule } from '@angular/core';
import { LoadingOverlayComponent } from './loading-overlay.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [IonicModule],
  declarations: [LoadingOverlayComponent],
  exports: [LoadingOverlayComponent]
})
export class LoadingOverlayModule {
}
