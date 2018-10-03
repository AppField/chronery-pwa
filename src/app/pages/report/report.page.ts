import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Project } from '../../models/project';
import { Observable } from 'rxjs';
import { ProjectsService } from '../../services/projects/projects.service';

@Component({
  selector: 'chy-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  toolbarColor: string;
  contrastColor: string;
  isDesktop: boolean;
  from: string;
  to: string;

  projects$: Observable<Project[]>;
  selectedProjects: Project[] = [];

  constructor(private platform: Platform,
              private projectsService: ProjectsService) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;
    this.contrastColor = !this.platform.is('ios') ? 'contrast-color' : null;
    this.isDesktop = this.platform.is('desktop');
    this.from = new Date().toISOString();
    this.to = new Date().toISOString();

    this.projects$ = this.projectsService.items$;
  }

  ngOnInit() {
  }

  updateProjects(event): void {
    this.selectedProjects = event.target.value;
    this.updateReport();
  }

  updateFrom(event): void {
    this.from = event.target.value;
    this.updateReport();
  }

  updateTo(event): void {
    this.to = event.target.value;
    this.updateReport();
  }

  updateReport(): void {
    console.log('Selected Projects', this.selectedProjects);
    console.log('FROM', this.from);
    console.log('TO', this.to);
  }

}
