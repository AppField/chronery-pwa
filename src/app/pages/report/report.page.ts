import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Project } from '../../models/project';
import { Observable } from 'rxjs';
import { ProjectsService } from '../../services/projects/projects.service';
import { endOfMonth } from 'date-fns';
import { encodeDate } from '../../utils/utils';
import { FirebaseQuery } from '../../models/firebase-query';
import { WorkingHours } from '../../models/working-hours';
import { WorkingHoursService } from '../../services/working-hours/working-hours.service';

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
  selectedProjects: Project[];
  reportData: WorkingHours[];
  filteredReportData: WorkingHours[];

  @ViewChild('toPicker') toPicker;

  constructor(
    private platform: Platform,
    private projectsService: ProjectsService,
    private workingHoursService: WorkingHoursService
  ) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;
    this.contrastColor = !this.platform.is('ios') ? 'contrast-color' : null;
    this.isDesktop = this.platform.is('desktop');

    const from = new Date();
    from.setUTCDate(1);
    this.from = from.toISOString();

    const to = endOfMonth(new Date());
    this.to = to.toISOString();

    this.projects$ = this.projectsService.items$;
  }

  ngOnInit() {
    this.updateReport();
  }

  updateProjects(event): void {
    this.selectedProjects = event.target.value as Project[];
    this.filterProjects();
  }


  updateFrom(event): void {
    this.from = event.target.value;
    this.toPicker.open();
  }

  updateTo(event): void {
    this.to = event.target.value;
    this.updateReport();
  }

  private filterProjects(): void {
    const projectIds = this.selectedProjects.map((project: Project) => project.id);
    if (this.reportData && projectIds.length > 0) {
      this.filteredReportData = this.reportData.filter((wh: WorkingHours) => projectIds.includes(wh.project.id));
    } else {
      this.filteredReportData = this.reportData;
    }
  }

  async updateReport() {

    const from = encodeDate(new Date(this.from));
    const to = encodeDate(new Date(this.to));

    const query = [
      { field: 'date', operator: '>=', value: from },
      { field: 'date', operator: '<=', value: to },
    ] as FirebaseQuery[];

    const reportData = await this.workingHoursService.filterItems(query, false);
    this.reportData = reportData;
    this.filterProjects();
  }

}
