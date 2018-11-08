import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { WorkingHoursService } from '../../services/working-hours/working-hours.service';
import { WorkingHours } from '../../models/working-hours';
import { addMonths, endOfMonth, subMonths } from 'date-fns';
import { FirebaseQuery } from '../../models/firebase-query';
import { encodeDate } from '../../utils/utils';
import { MinutesToTimePipe } from '../../utils/pipes/minutes-to-time/minutes-to-time';
import { Router } from '@angular/router';
import { fadeInOut } from '../../core/animations';

@Component({
  selector: 'chy-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  animations: [fadeInOut(0.5)]
})
export class DashboardPage {
  isLoading = true;
  toolbarColor: string;
  currentMonth: Date;
  monthData: WorkingHours[] = [];
  averageWorkTime: string;
  totalWorkTime: string;

  constructor(
    private platform: Platform,
    private workingHoursService: WorkingHoursService,
    private minutesToTimePipe: MinutesToTimePipe,
    private router: Router
  ) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;

    const timePlaceholder = this.minutesToTimePipe.transform(0);
    this.averageWorkTime = timePlaceholder;
    this.totalWorkTime = timePlaceholder;


    this.currentMonth = new Date();
    this.currentMonth.setUTCDate(1);

    this.updateMonthData();

  }

  previousMonth(): void {
    this.currentMonth = subMonths(this.currentMonth, 1);
    this.updateMonthData();
  }

  nextMonth(): void {
    this.currentMonth = addMonths(this.currentMonth, 1);
    this.updateMonthData();
  }

  goToWorkingHours(): void {
    this.router.navigate(['working-hours']);
  }

  goToProjects(): void {
    this.router.navigate(['projects']);
  }

  private async updateMonthData() {
    this.isLoading = true;
    const from = this.currentMonth;
    const to = endOfMonth(from);

    const query = [
      { field: 'date', operator: '>=', value: encodeDate(from) },
      { field: 'date', operator: '<=', value: encodeDate(to) },
    ] as FirebaseQuery[];

    try {
      this.monthData = await this.workingHoursService.filterItems(query, false);
      this.calcKpis();
    } catch (e) {
      this.isLoading = false;
    }
  }

  private calcKpis(): void {
    const total = this.monthData.reduce((acc, val) => acc += val.minutesSpent, 0);
    let curDate;

    const days = this.monthData.reduce((acc, value) => {
      if (curDate !== value.date) {
        curDate = value.date;
        return ++acc;
      } else {
        return acc;
      }
    }, 0);
    const average = Math.round(total / days);

    this.isLoading = false;
    this.averageWorkTime = this.minutesToTimePipe.transform(average) + ' Std.';
    this.totalWorkTime = this.minutesToTimePipe.transform(total) + ' Std.';
  }
}
