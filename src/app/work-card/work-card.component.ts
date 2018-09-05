import { Component, OnInit } from '@angular/core';
import { IonicWindow, ModalController, NavController } from '@ionic/angular';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'chy-work-card',
  templateUrl: './work-card.component.html',
  styleUrls: ['./work-card.component.scss']
})
export class WorkCardComponent implements OnInit {

  displayFormat = 'HH: mm';

  constructor(public modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ProjectModalComponent,
      componentProps: {project: 'Nummer 6'},
    });

    modal.onDidDismiss()
      .then((data) => {
        const project = data['project'];
        console.log('project from modal selected', project);
      });


    return await modal.present();
  }
}
