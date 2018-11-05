import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { WorkingHoursService } from '../../services/working-hours/working-hours.service';
import { WorkingHours } from '../../models/working-hours';
import { addMonths, endOfMonth, subMonths } from 'date-fns';
import { FirebaseQuery } from '../../models/firebase-query';
import { encodeDate } from '../../utils/utils';

@Component({
  selector: 'chy-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  toolbarColor: string;
  currentMonth: Date;
  monthData: WorkingHours[] = [];

  constructor(
    private workingHoursService: WorkingHoursService,
    private platform: Platform
  ) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;
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

  private async updateMonthData() {
    const from = this.currentMonth;
    const to = endOfMonth(from);

    const query = [
      { field: 'date', operator: '>=', value: encodeDate(from) },
      { field: 'date', operator: '<=', value: encodeDate(to) },
    ] as FirebaseQuery[];

    this.monthData = await this.workingHoursService.filterItems(query, false);
  }

  ngOnInit() {
  }

}
