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
import { DatePipe } from '@angular/common';
import { EncodedDatePipe } from '../../utils/pipes/encoded-date/encoded-date.pipe';
import { UtcTimePipe } from '../../utils/pipes/utc-time/utc-time.pipe';
import { MinutesToTimePipe } from '../../utils/pipes/minutes-to-time/minutes-to-time';

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
    private workingHoursService: WorkingHoursService,
    private datePipe: DatePipe,
    private encodedDatePipe: EncodedDatePipe,
    private utcTimePipe: UtcTimePipe,
    private minutesToTimePipe: MinutesToTimePipe
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

  filterProjects(): void {
    const projectIds = this.selectedProjects ? this.selectedProjects.map((project: Project) => project.id) : [];
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

    this.reportData = await this.workingHoursService.filterItems(query, false);
    this.filterProjects();
  }

  exportCSV(): void {
    const csv = this.convertArrayOfObjectsToCSV();
    this.downloadCSV(csv);
  }

  prepareData() {
    let result;
    const data = this.filteredReportData;

    const keys = ['date', 'from', 'to', 'minutesSpent', 'project.name', 'project.number', 'comment'];

    result = [];

    data.forEach((item: WorkingHours) => {
      const preparedItem = {};
      keys.forEach((key) => {
        let value;
        if (key.indexOf('.') !== -1) {
          const ids = key.split('.');
          value = item[ids[0]][ids[1]];
        } else {
          value = item[key];
        }

        switch (key) {
          case 'date':
            value = this.datePipe.transform(this.encodedDatePipe.transform(value));
            break;
          case 'from':
            value = this.datePipe.transform(this.utcTimePipe.transform(value), 'HH:mm');
            break;
          case 'to':
            value = this.datePipe.transform(this.utcTimePipe.transform(value), 'HH:mm');
            break;
          case 'minutesSpent':
            value = this.minutesToTimePipe.transform(value) + ' Std.';
            break;
        }

        preparedItem[key] = value;

      });
      result.push(preparedItem);
    });

    return result;

  }

  private convertArrayOfObjectsToCSV() {
    let result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = this.prepareData();
    if (data == null || !data.length) {
      return null;
    }

    columnDelimiter = ',';
    lineDelimiter = '\n';

    const header = ['Datum', 'Von', 'Bis', 'Stunden', 'Projektname', 'Projektnummer', 'Kommentar'];

    keys = ['date', 'from', 'to', 'minutesSpent', 'project.name', 'project.number', 'comment'];

    result = '';
    result += header.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach((item: WorkingHours) => {
      ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) {
          result += columnDelimiter;
        }

        result += `"${item[key]}"`;
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  private downloadCSV(csv) {
    let data, filename, link;

    if (csv == null) {
      return;
    }

    filename = `Chronery Report ${this.from} - ${this.to}.csv`;

    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
  }
}
