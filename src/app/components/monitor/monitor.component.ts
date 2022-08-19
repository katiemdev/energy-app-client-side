import { Component, OnInit, Input } from '@angular/core';
import { Monitor } from '../../../models/Monitor';
import { MonitorService } from '../../services/monitor.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { User } from 'src/models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css'],
})
export class MonitorComponent implements OnInit {
  monitors: Monitor[] = [];
  user!: User;
  showAddMonitor: boolean = false;
  subscription!: Subscription;

  constructor(
    private monitorService: MonitorService,
    private uiService: UiService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddMonitor = value));
  }

  ngOnInit(): void {
    //@GET Logged in user
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const userIdFromRoute = routeParams.get('userId');
    this.authService
      .getUserProfile(userIdFromRoute)
      .subscribe((user) => (this.user = user));

    //@GET user monitors
    this.monitorService
      .getUserMonitors(userIdFromRoute)
      .subscribe((monitors) => (this.monitors = monitors));
  }

  addMonitor(monitor: Monitor) {
    this.monitorService.addMonitor(monitor).subscribe((m) => {
      this.monitors.push(m);
      //set refresh to true so line chart will add new monitor
      this.monitorService.setRefresh(true);
    });
  }

  toggleAddMonitor() {
    this.uiService.toggleAddMonitor();
  }
}
