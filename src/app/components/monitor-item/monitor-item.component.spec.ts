import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import * as mongoose from 'mongoose';
import { Observable, of } from 'rxjs';
import { MonitorService } from 'src/app/services/monitor.service';
import { Monitor } from 'src/models/Monitor';
import SpyObj = jasmine.SpyObj;

import { MonitorItemComponent } from './monitor-item.component';

//Fake Monitor Observable for testing
let monitor: Observable<Monitor> = of<Monitor>({
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
});

describe('MonitorItemComponent', () => {
  let component: MonitorItemComponent;
  let fixture: ComponentFixture<MonitorItemComponent>;
  let mockService: SpyObj<MonitorService>;

  beforeEach(async () => {
    // Create a fake MonitorService object with a `getMonitor()` spy
    mockService = jasmine.createSpyObj('MonitorService', ['getMonitor']);
    mockService.getMonitor.and.returnValue(monitor);

    await TestBed.configureTestingModule({
      declarations: [MonitorItemComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: MonitorService,
          useValue: mockService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have monitor once subscribed to monitor service', (done) => {
    //undefined before service is called
    expect(component.monitor).toBeUndefined();

    //call service & assign monitor
    mockService.getMonitor(1).subscribe((m) => {
      component.monitor = m;
      done();
    });

    //defined after service is called
    expect(component.monitor).toBeDefined();

    expect(component.monitor.name).toEqual('Test Monitor');
  });
});
