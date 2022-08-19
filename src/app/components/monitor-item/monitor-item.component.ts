import { Component, OnInit, Input } from '@angular/core';
import { Monitor } from '../../../models/Monitor';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { Alarm } from 'src/models/Alarm';
import { MonitorService } from 'src/app/services/monitor.service';
import { ConfirmDialogComponent } from '../confirm-dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-monitor-item',
  templateUrl: './monitor-item.component.html',
  styleUrls: ['./monitor-item.component.css'],
})
export class MonitorItemComponent implements OnInit {
  @Input() monitor!: Monitor;
  alarms!: Alarm[];
  showWarning: boolean = false;

  constructor(
    private router: Router,
    private monitorService: MonitorService,
    private socketService: SocketService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //check if alarm thresholds have been reached when new data is added
    this.socketService.onMonitorUpdate().subscribe((data: any) => {
      this.getAlarms();
      for (let a of this.alarms) {
        if (data.monitor == this.monitor._id && data.usage > a.threshold) {
          this.openDialog(a.threshold);
        }
      }
    });
  }

  getAlarms() {
    this.monitorService.getAlarms(this.monitor._id).subscribe((alarms) => {
      this.alarms = alarms;
    });
  }
  openDialog(data: any): void {
    if (this.dialog.openDialogs.length == 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        width: '250px',
        data: {
          tag: 'alarm',
          title: 'Monitor Threshold Reached!',
          description: `Your monitor '${this.monitor.name}' has gone over ${data}kWh. Try turning off some appliances to lower your energy usage.`,
        },
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        console.log('The dialog was closed');
      });
    }
  }

  hasRoute(routeUrl: string) {
    return this.router.url == routeUrl;
  }
}
