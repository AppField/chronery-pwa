import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform, Searchbar } from '@ionic/angular';
import { Project } from '../../models/project';

@Component({
  selector: 'chy-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectModalComponent implements OnInit, AfterViewInit {
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

  ngAfterViewInit() {
    // TODO: remove this with modals ionModalDiPresent event
    setTimeout(() => {
      this.searchBar.focus();
    }, 250);

  }

  @HostListener('ionModalDidPresent')
  modalDidPresent(event) {
    console.log('======================= MODAL DID LOAD =======================');
  }


  selectProject(project: Project): void {
    this.modalCtrl.dismiss(project);
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

}
