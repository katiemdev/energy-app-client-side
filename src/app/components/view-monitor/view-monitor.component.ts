import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Monitor } from '../../../models/Monitor';
import { MonitorService } from 'src/app/services/monitor.service';
import { ConfirmDialogComponent } from '../confirm-dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/User';
import { Alarm } from 'src/models/Alarm';
import { AlarmDialogComponent } from '../alarm-dialog/alarm-dialog.component';
import { UpdateMonitorComponent } from '../update-monitor/update-monitor.component';

@Component({
  selector: 'app-view-monitor',
  templateUrl: './view-monitor.component.html',
  styleUrls: ['./view-monitor.component.css'],
})
export class ViewMonitorComponent implements OnInit {
  monitor!: Monitor;
  user!: User;
  alarms: Alarm[] = [];

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private monitorService: MonitorService,
    private dialog: MatDialog
  ) {
    this.user = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.getMonitor();
  }

  getMonitor(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const monitorIdFromRoute = routeParams.get('monitorId');

    this.monitorService
      .getMonitor(monitorIdFromRoute)
      .subscribe((monitor) => (this.monitor = monitor));

    this.monitorService.getAlarms(monitorIdFromRoute).subscribe((alarms) => {
      this.alarms = alarms;
    });
  }

  updateMonitor() {
    if (this.dialog.openDialogs.length == 0) {
      const dialogRef = this.dialog.open(UpdateMonitorComponent, {
        width: '400px',
        height: 'fit-content',
        disableClose: true,
        data: {
          tag: 'update',
          id: this.monitor._id,
          name: this.monitor.name,
          description: this.monitor.description,
        },
      });

      dialogRef.afterClosed().subscribe((data: any) => {
        if (data == false) {
          return;
        }

        this.monitorService
          .updateMonitor({
            id: this.monitor._id,
            name: data.name,
            description: data.description,
          })
          .subscribe(() => {
            console.log('Monitor Updated');
            this.ngOnInit();
          });
      });
    }
  }

  onDelete(monitor: Monitor) {
    if (this.dialog.openDialogs.length == 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '250px',
        disableClose: true,
        data: {
          tag: 'delete',
          title: 'Delete Monitor?',
          description:
            'This monitor will be removed from the database. This cannot be undone.',
        },
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result == true) {
          this.monitorService.deleteMonitor(monitor._id).subscribe(() => {
            this.route.navigate(['/dashboard/' + this.user._id]);
          });
          console.log('Monitor deleted');
        }
      });
    }
  }

  addAlarm() {
    if (this.dialog.openDialogs.length == 0) {
      const dialogRef = this.dialog.open(AlarmDialogComponent, {
        width: '400px',
        height: 'fit-content',
        disableClose: true,
        data: {
          tag: 'add',
          title: 'Add New Alarm',
          description:
            'Please enter a name, description, and threshold for your alarm.',
        },
      });

      dialogRef.afterClosed().subscribe((data: any) => {
        if (data == false) {
          return;
        }
        this.monitorService
          .addAlarm({
            name: data.name,
            description: data.description,
            threshold: data.threshold,
            monitor: this.monitor._id,
          })
          .subscribe(() => {
            console.log('Alarm Added');
            this.ngOnInit();
          });
      });
    }
  }

  alarmInfo(alarm: any) {
    if (this.dialog.openDialogs.length == 0) {
      const dialogRef = this.dialog.open(AlarmDialogComponent, {
        width: '400px',
        height: 'fit-content',
        disableClose: true,
        data: {
          tag: 'update',
          id: alarm._id,
          name: alarm.name,
          description: alarm.description,
          threshold: alarm.threshold,
        },
      });

      dialogRef.afterClosed().subscribe((data: any) => {
        if (data == false) {
          return;
        }

        if (data.event == 'delete') {
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '250px',
            disableClose: true,
            data: {
              tag: 'delete',
              title: 'Delete Alarm?',
              description:
                'This alarm will be removed from the database. This cannot be undone.',
            },
          });

          dialogRef.afterClosed().subscribe((result: any) => {
            if (result == true) {
              this.monitorService.deleteAlarm(alarm._id).subscribe(() => {
                console.log('Alarm deleted');
                this.ngOnInit();
              });
            }
          });
        } else {
          this.monitorService
            .updateAlarm({
              id: alarm._id,
              name: data.name,
              description: data.description,
              threshold: data.threshold,
            })
            .subscribe(() => {
              console.log('Alarm Updated');
              this.ngOnInit();
            });
        }
      });
    }
  }

  ngOnChanges() {}
}
