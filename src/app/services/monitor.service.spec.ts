import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import * as mongoose from 'mongoose';
import { of } from 'rxjs';
import { Monitor } from 'src/models/Monitor';
import { AuthService } from './auth.service';

import { MonitorService } from './monitor.service';

let httpClientSpy: jasmine.SpyObj<HttpClient>;
const authSpy = jasmine.createSpyObj('AuthService', ['currentUserValue']);
let service: MonitorService;
let mockMonitor: Monitor = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Test Monitor',
  description: 'Monitor Service Stub Test',
  monitorData: [
    {
      date: new Date(),
      usage: 10,
    },
  ],
  average: 10,
  date: new Date(),
  user: new mongoose.Types.ObjectId(),
};

describe('MonitorService', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    service = new MonitorService(httpClientSpy, authSpy);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        HttpClientTestingModule,
        { provide: AuthService, useValue: authSpy },
      ],
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected monitors (HttpClient called once)', (done: DoneFn) => {
    const expectedMonitors: Monitor[] = [mockMonitor];

    httpClientSpy.get.and.returnValue(of(expectedMonitors));

    service.getMonitors().subscribe({
      next: (monitors) => {
        expect(monitors)
          .withContext('expected monitors')
          .toEqual(expectedMonitors);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should add a new monitor', (done: DoneFn) => {
    const expectedMonitor = mockMonitor;

    httpClientSpy.post.and.returnValue(of(expectedMonitor));

    service.addMonitor(mockMonitor).subscribe({
      next: (monitor) => {
        expect(monitor)
          .withContext('expected monitor')
          .toEqual(expectedMonitor);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  });

  it('should return monitor by its id (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockMonitor));

    service.getMonitor(mockMonitor._id).subscribe({
      next: (monitor) => {
        expect(monitor).withContext('expected monitors').toEqual(mockMonitor);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should return monitor by its user (HttpClient called once)', (done: DoneFn) => {
    const expectedMonitors: Monitor[] = [mockMonitor];
    httpClientSpy.get.and.returnValue(of(expectedMonitors));

    service.getUserMonitors(mockMonitor.user).subscribe({
      next: (monitors) => {
        expect(monitors)
          .withContext('expected monitor')
          .toEqual(expectedMonitors);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
