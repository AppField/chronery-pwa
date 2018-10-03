import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Project } from '../../models/project';
import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { ProjectsService } from '../../services/projects/projects.service';
import { Observable, Subject } from 'rxjs';
import { combineLatest, merge, take, takeUntil } from 'rxjs/operators';

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

  private destroy$: Subject<boolean> = new Subject<boolean>();

  toolbarColor: string = null;
  showCancelButton = true;
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
      .pipe(
        merge(this.projectsService.filteredItems$)
      )
      .subscribe((projects: Project[]) => {
        console.log(projects);
        this.projects = projects;
      });


    // .pipe(takeUntil(this.destroy$))
    // .subscribe((projects: Project[]) => {
    //   console.log(projects);
    //   this.projects = projects;
    // });


    // this.projectsService.items$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((projects: Project[]) => {
    //       console.log('projects', projects);
    //       this.projects = projects;
    //     }
    //   );
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

  showInactiveChange(): void {
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
  }

}
