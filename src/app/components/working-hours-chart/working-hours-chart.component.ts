import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'chy-working-hours-chart',
  templateUrl: './working-hours-chart.component.html',
  styleUrls: ['./working-hours-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkingHoursChartComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
