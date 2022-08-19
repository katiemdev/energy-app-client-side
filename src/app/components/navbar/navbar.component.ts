import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUser!: User;

  constructor(public authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
  }

  logout() {
    this.authService.logout();
  }

  hasRoute(routeUrl: string) {
    return this.router.url == routeUrl;
  }

  navigate() {
    if (this.currentUser) {
      this.router.navigate(['dashboard', this.currentUser._id]);
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {}
}
