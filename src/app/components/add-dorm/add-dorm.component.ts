import { Component } from '@angular/core';
import { User } from 'src/app/interface/user';
import { Dorm } from 'src/app/models/dorms.model';
import { DormService } from 'src/app/services/dorm.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DormImagesUploadDialogComponent } from 'src/app/dialogs/dorm-images-upload-dialog/dorm-images-upload-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewEncapsulation } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-add-dorm',
  templateUrl: './add-dorm.component.html',
  styleUrls: ['./add-dorm.component.css']
})
export class AddDormComponent {
  selectedFiles?: FileList;
  currentUser : User;
  user: User;
  dormForm: FormGroup;
  defaultValue: 1;

  dorm: Dorm = {
    user_id: '',
    title: '',
    description: '',
    address: '',
    lessor: '', 
    bedroom: 1,
    bathroom: 1,
    vacancy: 1,
    rent: 0,
    for_rent: false,
    publish: false,
  };

  constructor(
    private dormService: DormService,
    private tokenService: TokenStorageService,
    private userService: UserService,
    private fb : FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private paymentService: PaymentService
    ) { 
      this.createForm();
    }

    createForm() {
      this.dormForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(5)]],
        description: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(5)]],
        address: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
        bedroom: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(1), Validators.pattern(/^[1-9]*$/)]],
        bathroom: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(1), Validators.pattern(/^[1-9]*$/)]],
        vacancy: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(1), Validators.pattern(/^[1-9]*$/)]],
        rent: ['', [Validators.required, Validators.maxLength(100000), Validators.minLength(100)]],
        contact_number: ['', [Validators.required, Validators.pattern("^[0-9]{11}$")]]
      });
    }
    

  submitted = false;

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    this.userService.retrieveUserWithId(this.currentUser.id).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (e) => console.error(e)
    });
  }

  saveDorm(): void {
    if (this.user.verified != false) {
      var lessorName = this.user.first_name + ' ' + this.user.last_name;
      const contactNumber = '+63' + this.dormForm.get('contact_number').value;
  
      const data = {
        user_id: this.user.id,
        username: this.user.username,
        user_image: this.user.user_image,
        title: this.dormForm.get('title').value,
        description: this.dormForm.get('description').value,
        address: this.dormForm.get('address').value,
        lessor: lessorName,
        bedroom: this.dormForm.get('bedroom').value,
        bathroom: this.dormForm.get('bathroom').value,
        vacancy: this.dormForm.get('vacancy').value,
        contact_number: contactNumber,
        rent: this.dormForm.get('rent').value,
      };
  
      this.dormService.create(data)
        .subscribe({
          next: (res) => {
            this.submitted = true;
            this.openDormImgUploadDialog(res.data);
          },
          error: (e) => console.error(e)
        });
    } else {
      this.showSnackbarTopPosition('Please Make Your account Verified by Uploading a Valid ID', 'Ok', '10000');
      this.router.navigate(['/profile']);
    }
  }
  

  showSnackbarTopPosition(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: duration,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['custom-style']
    });
  }

  openDormImgUploadDialog(dorm: Dorm): void {
    let dialogRef = this.dialog.open(DormImagesUploadDialogComponent, { 
      width: '900px', 
      height: '80vh',
      data: dorm
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.router.navigate(['/profile']);
     }); 
  }

  newDorm(): void {
    this.submitted = false;
    this.dorm = {
      title: '',
      description: '',
      address: '',
      lessor: '', 
      bedroom: 0,
      bathroom: 0,
      rent: 0,
      for_rent: false
    };
  }

}
