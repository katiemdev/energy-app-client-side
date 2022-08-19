import { Component, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartType,
  TimeScale,
} from 'chart.js';
Chart.register(TimeScale);
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-moment';
import { Monitor } from 'src/models/Monitor';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent {
  @Input() monitor!: Monitor;
  usageArr!: any[];
  dateArray: Map<string, number> = new Map<string, number>();

  ngOnInit() {
    this.configChart();
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
    },
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: this.monitor?.name,
        parsing: false,
      },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public configChart() {
    this.usageArr = Array.from(this.monitor.monitorData);
    this.barChartData.datasets[0].label = this.monitor.name;

    //BY DAY
    for (let i = 0; i < this.usageArr.length; i++) {
      let date = moment(this.usageArr[i].date).format('LL');
      if (!this.dateArray.has(date)) {
        this.dateArray.set(date, this.usageArr[i].usage);
      } else {
        this.dateArray.set(
          date,
          this.dateArray.get(date) + this.usageArr[i].usage
        );
      }
    }

    this.dateArray.forEach((v, k) => {
      this.barChartData.datasets[0].data.push({
        x: Date.parse(k),
        y: v,
      });
    });
  }

  public changeTime(timeUnit: 'day' | 'week' | 'month') {
    this.barChartOptions = {
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: timeUnit,
          },
        },
      },
    };
    this.configChart();
    this.chart?.update();
  }

  ngOnChanges() {
    this.chart?.update();
  }

  // // helper function to get the month name from an item
  // monthName = (item: any) =>
  //   moment(item.created_at, 'YYYY-MM-DD').format('MMM');
}
