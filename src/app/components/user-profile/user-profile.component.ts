import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MonitorService } from 'src/app/services/monitor.service';
import { Monitor } from 'src/models/Monitor';
import { User } from 'src/models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user!: User;
  monitors!: Monitor[];
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    public monitorService: MonitorService
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');

    this.authService.getUserProfile(id).subscribe((res) => {
      this.user = res;
    });

    this.monitorService
      .getUserMonitors(id)
      .subscribe((mons) => (this.monitors = mons));
  }

  ngOnInit(): void {}
}
