import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Monitor } from 'src/models/Monitor';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-monitor',
  templateUrl: './add-monitor.component.html',
  styleUrls: ['./add-monitor.component.css'],
})
export class AddMonitorComponent implements OnInit {
  @Output() onAddMonitor: EventEmitter<Monitor> = new EventEmitter();
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  showAddMonitor!: boolean;
  subscription!: Subscription;
  form!: FormGroup;
  submitted!: boolean;

  constructor(private uiService: UiService, private fb: FormBuilder) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddMonitor = value));

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    const res = this.form.value;
    this.onAddMonitor.emit(res);
    this.form.reset();
    this.formDirective.resetForm();
  }
}
