import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReduxService } from 'src/app/services/redux.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  userForm: FormGroup

  constructor(
    private reduxService: ReduxService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.userForm = this.fb.group({
        name: [this.data.name],
        username: [this.data.username],
        email: [this.data.email],
        website: [this.data.website]
      })
    } else {
      this.userForm = this.fb.group({
        name: [''],
        username: [''],
        email: [''],
        website: ['']
      })
    }
  }

  update() {
    const updatedUser = { ...this.data, ...this.userForm.value };
    if (this.data) {
      this.reduxService.updateUser(updatedUser);
      this.dialogRef.close();
    } else {
      this.reduxService.addUser(this.userForm.value);
      this.dialogRef.close();
    }
  }

}
