import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/User';

import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import * as mongoose from 'mongoose';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const authServiceStub: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'authService',
    ['signIn']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        HttpClientModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [LoginComponent],
      providers: [
        HttpClient,
        {
          provide: AuthService,
          useValue: authServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke auth service when form is valid', () => {
    const email = component.loginForm.controls['email'];
    email.setValue('test@test.com');
    const password = component.loginForm.controls['password'];
    password.setValue('123456');

    authServiceStub.signIn.and.returnValue(of());

    fixture.nativeElement.querySelector('button').click();

    expect(authServiceStub.signIn.calls.any()).toBeTruthy();

    expect(authServiceStub.signIn).toHaveBeenCalledWith({
      email: email.value,
      password: password.value,
    });
  });
});
