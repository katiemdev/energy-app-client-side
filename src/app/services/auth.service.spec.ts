import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as mongoose from 'mongoose';
import { User } from 'src/models/User';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let router: Router;
  let localStore: any;

  let mockUser: User = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Person',
    email: 'abc123@email.com',
    password: '123456',
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new AuthService(httpClientSpy, router);

    localStore = {};

    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );
    spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [HttpClientTestingModule],
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', (done: DoneFn) => {
    const expectedUser: User = mockUser;
    spyOn(service, 'signIn').withArgs({}).and.returnValue(of(expectedUser));

    service.signIn({}).subscribe({
      next: (user: any) => {
        expect(user).toBeDefined();
        expect(user).withContext('expected user').toEqual(expectedUser);
        done();
      },
      error: () => {
        new Error();
      },
    });
    expect(service.signIn).toHaveBeenCalled();
  });

  it('should logout', () => {
    // const navigateSpy = spyOn(router, 'navigate');
  });
});
