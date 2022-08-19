import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MonitorService } from 'src/app/services/monitor.service';
import { ViewMonitorComponent } from './view-monitor.component';
import { Observable, of } from 'rxjs';
import { Monitor } from 'src/models/Monitor';
import * as mongoose from 'mongoose';
import SpyObj = jasmine.SpyObj;
import { User } from 'src/models/User';
import { MatCardModule } from '@angular/material/card';

//Fake user for testing
let user: User = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Katie',
  email: 'myemail@gmail.com',
  password: '123',
};

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
  user: user._id,
});

// let monitorService: MonitorService;

describe('ViewMonitorComponent', () => {
  let component: ViewMonitorComponent;
  let fixture: ComponentFixture<ViewMonitorComponent>;
  let mockService: SpyObj<MonitorService>;

  beforeEach(async () => {
    // Create a fake MonitorService object with a `getMonitor()` spy
    mockService = jasmine.createSpyObj('MonitorService', ['getMonitor']);

    await TestBed.configureTestingModule({
      declarations: [ViewMonitorComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatCardModule,
      ],
      providers: [
        {
          provide: MonitorService,
          useValue: mockService,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 1,
              },
            },
          },
        },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMonitorComponent);
    component = fixture.componentInstance;
    component.user = user;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a monitor', () => {
    // Make the spy return a synchronous Observable with the test data
    mockService.getMonitor.and.returnValue(monitor);
    fixture.detectChanges();

    expect(mockService.getMonitor).toHaveBeenCalled();

    expect(
      mockService.getMonitor(1).subscribe((m) => {
        expect(m.name).toBe('Test Monitor');
      })
    );
  });
});
