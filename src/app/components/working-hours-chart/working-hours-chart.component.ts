import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { WorkingHours } from '../../models/working-hours';
import { decodeDate } from '../../utils/utils';
import { DatePipe } from '@angular/common';
import { MinutesToTimePipe } from '../../utils/pipes/minutes-to-time/minutes-to-time';

interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'chy-working-hours-chart',
  templateUrl: './working-hours-chart.component.html',
  styleUrls: ['./working-hours-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WorkingHoursChartComponent {
  // === CHART VALUES ===
  chartData = [] as ChartData[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Tage';
  showYAxisLabel = true;
  yAxisLabel = 'Arbeitszeit';
  colors = {
    domain: ['#3962c5']
  };

  // === END CHART VALUES ===

  @Input()
  set data(data: WorkingHours[]) {
    this.prepareData(data);
  }

  constructor(
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe,
    private minutesToTimePipe: MinutesToTimePipe
  ) {
  }

  minutesFormatter(value): string {
    return this.minutesToTimePipe.transform(value) + ' Std.';
  }


  /***
   * Reduce Array of WorkingHours to two arrays for labels and their associated total minutes spent.
   *
   * @param workingHours
   */
  private prepareData(workingHours: WorkingHours[]): void {
    if (workingHours.length === 0) {
      this.chartData = [];
      return;
    }

    // Start Value for reduce function
    const accStart = [{
      name: workingHours[0].date,
      value: +workingHours[0].minutesSpent
    }] as ChartData[];

    const chartData = workingHours.reduce((acc, val) => {
      const idx = acc.length - 1;

      if (acc[idx].name === val.date) {
        // Same day, add minutes Spent
        acc[idx].value += +val.minutesSpent;
      } else {
        // New day, format date and push new day
        const date = acc[idx].name;
        // acc.labels[idx] = this.datePipe.transform(date);
        acc[idx].name = this.datePipe.transform(decodeDate(date as string), 'dd. MMM');

        acc.push({
          name: val.date,
          value: +val.minutesSpent
        });
      }
      return acc;
    }, accStart);

    chartData[chartData.length - 1].name = this.datePipe.transform(chartData[chartData.length - 1].name, 'dd. MMM');

    this.chartData = [...chartData, ...this.chartData];
    console.log('NEW CHART DATA', this.chartData);
  }
}
