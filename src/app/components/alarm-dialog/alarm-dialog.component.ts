import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alarm-dialog',
  templateUrl: './alarm-dialog.component.html',
  styleUrls: ['./alarm-dialog.component.css'],
})
export class AlarmDialogComponent implements OnInit {
  addForm!: FormGroup;
  updateForm!: FormGroup;
  formisinvalid = true;

  constructor(
    public dialogRef: MatDialogRef<AlarmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      threshold: ['', Validators.required],
    });

    this.updateForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description],
      threshold: [data.threshold, Validators.required],
    });
  }

  onSubmit() {
    if (this.data.tag == 'add') {
      this.dialogRef.close(this.addForm.value);
    } else {
      this.dialogRef.close(this.updateForm.value);
    }
  }

  deleteAlarm() {
    return this.dialogRef.close({ event: 'delete' });
  }

  ngOnInit(): void {}
}
