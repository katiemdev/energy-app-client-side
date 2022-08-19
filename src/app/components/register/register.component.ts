import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errors: string[] = [];

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {}

  registerUser() {
    this.authService.signUp(this.registerForm.value).subscribe({
      next: (res: any) => {
        console.log(res.result._id);
        this.router.navigate(['login']);
      },
      error: (err: any) => {
        err = JSON.parse(err.message);

        for (let e of err) {
          this.errors.push(e.msg);
        }
        console.log(this.errors);
      },
    });
  }
}
