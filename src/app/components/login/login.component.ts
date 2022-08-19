import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showErrorMessage = false;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {}

  loginUser() {
    this.authService
      .signIn(this.loginForm.value)
      .pipe(first())
      .subscribe({
        next: (user: any) => {
          this.router.navigate(['dashboard/' + user._id]);
        },
        error: (e) => {
          this.showErrorMessage = true;
        },
      });
  }
}
