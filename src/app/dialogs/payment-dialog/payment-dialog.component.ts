import { Component, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from 'src/app/services/payment.service';
import { Dorm } from 'src/app/models/dorms.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DormService } from 'src/app/services/dorm.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent {

userInfo : any;
dormResp: any;
dorm: Dorm;
paymentDorm: Dorm;
checkOutUrl: any;
  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private paymentService: PaymentService,
    private dormService: DormService,
  ) {}
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // Extract user_id and dorm_id from the data object passed into the dialog
    const { user_id, _id } = this.data;

    // Create a userInfo object to store the extracted data as JSON
    this.userInfo = {
      user_id: user_id,
      dorm_id: _id
    };

    this.retrievePaymentDorm();

  }

  retrievePaymentDorm(): void {
    this.dormService.getDormById(this.data._id)
      .subscribe({
        next: (data) => {
          this.paymentDorm = data;
          this.checkOutUrl = this.paymentDorm.payment_checkout_url;

        },
        error: (e) => console.error(e)
      });
  }

  paymentPortal() {
    this.paymentService.createPayment(this.userInfo).subscribe((resp) => {
      console.log(resp);
      this.dormResp = resp;
      this.dorm = this.dormResp.data;
      //this.checkOutUrl = this.dorm.payment_checkout_url;
  
      // Check if this.dorm is defined and contains payment_checkout_url
      if (this.dorm && this.dorm.payment_checkout_url) {
        // Open payment checkout URL in a new tab
        window.open(this.dorm.payment_checkout_url, '_blank');
      } else {
        console.error("Payment checkout URL not found in response");
        // Handle error or inform the user accordingly
      }
    }, (error) => {
      console.error("Error occurred while creating payment:", error);
      // Handle error or inform the user accordingly
    });
  }
  
  

  closeDialog(): void {
    this.dialogRef.close(); // Close the dialog
  }


}
