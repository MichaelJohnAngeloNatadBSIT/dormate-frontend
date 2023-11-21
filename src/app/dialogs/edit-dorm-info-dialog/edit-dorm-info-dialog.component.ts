import { Component, Inject } from '@angular/core';
import { User } from 'src/app/interface/user';
import { Dorm } from 'src/app/models/dorms.model';
import { DormService } from 'src/app/services/dorm.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dorm-info-dialog',
  templateUrl: './edit-dorm-info-dialog.component.html',
  styleUrls: ['./edit-dorm-info-dialog.component.css']
})
export class EditDormInfoDialogComponent {
  
  dormForm: FormGroup;

  dorm: Dorm = {
    user_id: '',
    title: '',
    description: '',
    address: '',
    lessor: '', 
    bedroom: 0,
    bathroom: 0,
    rent: 0,
    for_rent: false,
    published: false,
  };

  constructor(
    public dialogRef: MatDialogRef<EditDormInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dormService: DormService,
    private fb : FormBuilder,
    ) { 
      this.createForm();
    }

    createForm() {
      this.dormForm = this.fb.group({
         title: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(5)]],
         description: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
         address: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
         bedroom: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(1)]],
         bathroom: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(1)]],
         rent: ['', [Validators.required, Validators.maxLength(100000), Validators.minLength(100)]],

      });
    }

  updateDorm(): void {
    const updateData = this.dormForm.getRawValue();
    this.dormService.update(this.data._id, updateData)
      .subscribe({
        next: (res) => {

        },
        error: (e) => console.error(e)
      });
  }


}
