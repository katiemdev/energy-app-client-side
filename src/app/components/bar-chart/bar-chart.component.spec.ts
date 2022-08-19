import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import * as mongoose from 'mongoose';
import { Monitor } from 'src/models/Monitor';

import { BarChartComponent } from './bar-chart.component';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [BarChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;

    component.monitor = {
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
