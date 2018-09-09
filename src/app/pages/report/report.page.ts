import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { endOfMonth } from 'date-fns';
import { Project } from '../../models/project';

@Component({
  selector: 'chy-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  toolbarColor: string;
  from: string;
  to: string;
  contrastColor: string;

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

  selectedProjects: Project[] = [];

  constructor(private platform: Platform) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;
    this.contrastColor = !this.platform.is('ios') ? 'contrast-color' : null;
    this.from = new Date().toISOString();
    this.to = new Date().toISOString();

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
