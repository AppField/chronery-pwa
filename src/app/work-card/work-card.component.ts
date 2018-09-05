import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'chy-work-card',
  templateUrl: './work-card.component.html',
  styleUrls: ['./work-card.component.scss']
})
export class WorkCardComponent implements OnInit {

  customActionSheetOptions: any = {
    header: 'Projekt',
    subHeader: 'Bitte wählen Sie ein Projekt aus'
  };

  constructor(public modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ProjectModalComponent,
      componentProps: {project: 'Nummer 6'},
    });

    // const data = await modal.onWillDismiss();
    // console.log('data from modal', data);

    return await modal.present();
  }

}
