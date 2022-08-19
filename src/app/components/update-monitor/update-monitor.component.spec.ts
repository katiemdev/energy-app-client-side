import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMonitorComponent } from './update-monitor.component';

describe('UpdateMonitorComponent', () => {
  let component: UpdateMonitorComponent;
  let fixture: ComponentFixture<UpdateMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
