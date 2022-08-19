import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AddMonitorComponent } from './add-monitor.component';

describe('AddMonitorComponent', () => {
  let component: AddMonitorComponent;
  let fixture: ComponentFixture<AddMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMonitorComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set submitted to true', async () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });
});
