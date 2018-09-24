import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Project } from '../../models/project';
import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { ProjectsService } from '../../services/projects/projects.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'chy-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('350ms', [
          animate('500ms ease-in', keyframes([
            style({ opacity: 0, transform: 'translate3d(0, 20px, 0)', offset: 0 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1.0 }),
          ]))
        ]), { optional: true }),

        query(':leave', stagger('350ms', [
          animate('500ms ease-in', keyframes([
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 0 }),
            style({ opacity: 0, transform: 'translate3d(0, 20px, 0)', offset: 1.0 })
          ]))
        ]), { optional: true })
      ])
    ])
  ]
})
export class ProjectsPage implements OnInit, OnDestroy {

  toolbarColor: string = null;
  showCancelButton = true;
  projects$: Observable<Project[]>;
  // projects: Project[];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private platform: Platform,
              private projectsService: ProjectsService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {
    if (!this.platform.is('ios')) {
      this.toolbarColor = 'primary';
      this.showCancelButton = false;
    }

    this.projects$ = this.projectsService.projects;

    // this.projectsService.projects
    //   .pipe(
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe((projects: Project[]) => {
    //     this.projects = projects;
    //   });
  }

  ngOnInit() {
  }

  searchProjects(event): void {
    console.log('search projects input', event.target.value);
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
              this.projectsService.createProject(newProject);
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
    console.log('projet to set', project);
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
