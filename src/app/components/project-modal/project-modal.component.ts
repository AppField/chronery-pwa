import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform, RippleEffect, Searchbar } from '@ionic/angular';
import { Project } from '../../models/project';

@Component({
  selector: 'chy-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {
  @ViewChild('searchBar') searchBar: Searchbar;

  @Input() project: any;

  toolbarColor: string;
  projects: Project[];
  searchText = '';

  constructor(private platform: Platform,
              private modalCtrl: ModalController) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;
  }

  ngOnInit() {
    // const projectModal = {projectModal: true};
    // history.pushState(projectModal, "Project Modal", "Modal");
  }

  @HostListener('ionModalDidPresent')
  modalDidPresent(event) {
    console.log('Did present');
  }


  selectProject(project: Project): void {
    console.log('selected project', project);
    this.modalCtrl.dismiss(project);
  }

  onCancel() {
    // console.log('will dismiss');
    this.modalCtrl.dismiss();
  }

}
