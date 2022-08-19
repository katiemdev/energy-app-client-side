import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlarmDialogComponent } from '../alarm-dialog/alarm-dialog.component';

@Component({
  selector: 'app-update-monitor',
  templateUrl: './update-monitor.component.html',
  styleUrls: ['./update-monitor.component.css'],
})
export class UpdateMonitorComponent implements OnInit {
  form!: FormGroup;
  formisinvalid = true;

  constructor(
    public dialogRef: MatDialogRef<AlarmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description],
    });
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }

  ngOnInit(): void {}
}
