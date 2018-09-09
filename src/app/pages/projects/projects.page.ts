import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Project } from '../../models/project';
import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';

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
export class ProjectsPage implements OnInit {

  toolbarColor: string = null;
  showCancelButton = true;
  projects: Project[] = [
    { name: 'Test Project 1', number: 'TP1', active: true },
    { name: 'Project 2', number: 'TP2', active: true },
    { name: 'Test Project 1', number: 'TP1', active: true },
    { name: 'Web Design', number: 'WD', active: false },
    { name: 'Backend', number: 'BE', active: false },
    { name: 'Firebase Setup', number: 'FBS', active: true },
    { name: 'Uni Project', number: 'UP', active: true },
    { name: 'Something', number: 'ST', active: false }
  ] as Project[];


  constructor(private platform: Platform) {
    if (!this.platform.is('ios')) {
      this.toolbarColor = 'primary';
      this.showCancelButton = false;
    }
  }

  ngOnInit() {
  }

  searchProjects(event): void {
    console.log('search projects input', event.target.value);
  }

  addProject(): void {
    this.projects.unshift({ name: 'New Project', number: 'NP1', active: true });
  }

}
