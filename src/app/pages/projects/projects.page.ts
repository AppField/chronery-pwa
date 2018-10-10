import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Project } from '../../models/project';
import { ProjectsService } from '../../services/projects/projects.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { appear } from '../../core/animations';

@Component({
  selector: 'chy-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
  animations: [
    appear
  ]
})
export class ProjectsPage implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  toolbarColor: string = null;
  showCancelButton = true;
  searchText = '';
  // projects$: Observable<Project[]>;
  projects: Project[] = [];
  hideInactive = true;

  constructor(private platform: Platform,
              private projectsService: ProjectsService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {
    if (!this.platform.is('ios')) {
      this.toolbarColor = 'primary';
      this.showCancelButton = false;
    }

    this.projectsService.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((projects: Project[]) => {
        this.projects = projects;
      });
  }

  ngOnInit() {
  }

  async addProject() {

    const alert = await this.alertCtrl.create({
      header: 'Neues Projekt',
      message: 'Geben sie einen Namen und eine Nummer für das Projekt an.',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Projektname'
        },
        {
          name: 'number',
          type: 'text',
          placeholder: 'Projektnummer'
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        }, {
          text: 'Projekt erstellen',

          handler: (inputs) => {
            const { name, number } = inputs;
            if (name !== '' && number !== '') {
              const newProject = new Project(name, number);
              this.projectsService.addItem(newProject);
            } else {
              const message = 'Bitte geben Sie einen Namen und eine Nummer für das Projekt an.';
              this.showToast(message);
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  setProject(project: Project) {
    if (project) {
      this.projectsService.updateItem(project);
    }
  }

  async showInactiveChange() {
    this.projectsService.updateHideInactive(this.hideInactive);
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      showCloseButton: true,
      position: 'middle',
      closeButtonText: 'OK'
    });
    toast.present();
  }

  trackById(index: number, project: Project): string {
    if (project) {
      return project.id;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.projectsService.updateHideInactive(true);
  }

}
