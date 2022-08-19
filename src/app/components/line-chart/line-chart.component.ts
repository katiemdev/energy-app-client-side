import { Component, OnInit, ViewChild } from '@angular/core';
import 'chartjs-adapter-date-fns';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Monitor } from '../../../models/Monitor';
import { MonitorService } from '../../services/monitor.service';
import { SocketService } from 'src/app/services/socket.service';
import { User } from 'src/models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  monitors: Monitor[] = [];
  usage!: Object;
  usageArr!: any[];
  user!: User;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
      },
      y: {
        max: 10,
      },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private monitorService: MonitorService,
    private socketService: SocketService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Use refresh method in monitor service to update chart when new monitor is added
    this.monitorService.getRefresh().subscribe((value: boolean) => {
      if (value) {
        this.lineChartData.datasets = [];
        this.buildChart();
        this.monitorService.setRefresh(false);
      }
    });

    this.buildChart();
  }

  public buildChart() {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const userIdFromRoute = routeParams.get('userId');
    const colours = ['#e62c1c', '#5e49eb', '#4bba45', '#8462b3', '#de874e'];

    //@GET user monitors
    this.monitorService
      .getUserMonitors(userIdFromRoute)
      .subscribe((monitors) => {
        this.monitors = monitors;

        for (let monitor of this.monitors) {
          //put data in temp array
          this.usageArr = Array.from(monitor.monitorData);
          let colour = colours[this.monitors.indexOf(monitor)];

          this.lineChartData.datasets.push({
            data: [],
            label: monitor.name,
            backgroundColor: colour,
            borderColor: colour,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointBackgroundColor: colour,
            pointHoverBorderColor: colour,
            fill: 'false',
          });

          for (let i = 0; i < this.usageArr.length; i++) {
            //first element in the array = oldest data.
            //shorten array to first 10 elements
            while (this.usageArr.length > 10) {
              this.usageArr.shift();
            }

            this.lineChartData.datasets[
              this.monitors.indexOf(monitor)
            ].data.push({
              x: new Date(this.usageArr[i].date).getTime(),
              y: this.usageArr[i].usage,
            });
          }
          this.chart?.update();

          //update chart every time socket detects new data
          this.socketService.onMonitorUpdate().subscribe((usage: any) => {
            if (monitor._id == usage.monitor) {
              this.updateChart(usage, monitor);
              console.log(`socket.io: ${monitor.name} updated`);
            }
          });
        }
      });
  }

  public updateChart(usage: any, monitor: any): void {
    let index = this.monitors.indexOf(monitor);
    //remove first element in dataset (start of chart)
    this.lineChartData.datasets[index].data.shift();

    //add new element to end of dataset/chart
    this.lineChartData.datasets[index].data.push({
      x: new Date(usage.date).getTime(),
      y: usage.usage,
    });
    this.chart?.update();
  }
}

//TEST USING TEST MONITOR ID
// this.monitorService
//   .getMonitor('62532b5ab4f43cc2b1e1f50a')
//   .subscribe((monitor: any) => {
//     //put data in temp array
//     this.usageArr = Array.from(monitor.monitorData);

//     for (let i = 0; i < this.usageArr.length; i++) {
//       //first element in the array = oldest data.
//       //shorten array to first 10 elements
//       while (this.usageArr.length > 10) {
//         this.usageArr.shift();
//       }

//       this.lineChartData.datasets[0].data.push({
//         x: new Date(this.usageArr[i].date).getTime(),
//         y: this.usageArr[i].usage,
//       });
//     }
//     this.chart?.update();
//   });
