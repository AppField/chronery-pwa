import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Utils } from '../../utils/utils';

interface DayMeta {
  date: Date;
  totalTime: string;
  projects: number;
  url: string;
}

@Component({
  selector: 'chy-day-picker',
  templateUrl: './day-picker.component.html',
  styleUrls: ['./day-picker.component.scss']
})

export class DayPickerComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  days: DayMeta[];
  monthYear: Date;


  constructor() {
    this.monthYear = new Date();
    this.getDays();
  }

  ngOnInit() {
  }

  private getDays(): void {
    this.days = [];
    // get list of days of current month
    const helperDate = new Date(this.monthYear);
    const currentMonth = helperDate.getMonth();
    helperDate.setDate(1);
    do {
      this.days.push({
        date: new Date(helperDate),
        totalTime: '00:00',
        projects: 0,
        url: `/working-hours/${Utils.encodeDate(helperDate)}`
      });
      helperDate.setDate(helperDate.getDate() + 1);
    } while (helperDate.getMonth() === currentMonth);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
