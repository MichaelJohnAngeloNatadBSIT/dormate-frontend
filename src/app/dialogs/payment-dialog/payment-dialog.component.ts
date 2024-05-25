import { Component, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from 'src/app/services/payment.service';
import { Dorm } from 'src/app/models/dorms.model';
import { DormService } from 'src/app/services/dorm.service';
import { Payment } from 'src/app/models/payment.model';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent {

userInfo : any;
dormResp: any;
dorm: Dorm;
payment: Payment;
paymentDorm: Dorm;
checkOutUrl: any;
payment_status: string;
reference_number: any;
  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private paymentService: PaymentService,
    private dormService: DormService,
  ) {}
  
  ngOnInit(): void {
    this.dorm = this.data;

      if(this.dorm.payment_reference_number){
        this.retrievePaymentStatus(this.dorm.payment_reference_number);  
      }

  }

  retrievePaymentDorm(): void {
    this.dormService.getDormById(this.data._id)
      .subscribe({
        next: (data) => {
          this.paymentDorm = data;
          this.checkOutUrl = this.paymentDorm.payment_checkout_url;
          this.reference_number = this.paymentDorm.payment_reference_number;
          this.retrievePaymentStatus(this.reference_number);   
        },
        error: (e) => console.error(e)
      });
  }

  retrievePaymentStatus(reference_number: any) {
    this.paymentService.getPayment(reference_number).subscribe(
      (resp: any) => {
        this.payment = resp.data.data.attributes;
        this.payment_status = this.payment.status; // Set payment_status based on payment.status
        const dormData = { payment_status: this.payment_status };
        if(this.payment_status === 'paid' && this.dorm.payment_status === 'unpaid'){
          this.dormService.update(this.data._id, dormData).subscribe(
            (response: any) => {
              console.log(response);
            },
            (error: any) => {
              console.log(error);
            }
          );
        }

        const paymentData = { status: this.payment.status , checkout_url: this.payment.checkout_url}
        this.paymentService.updatePayment(paymentData).subscribe(
            (response: any) => {
              console.log(response);
            },
            (error: any) => {
              console.log(error);
            }
          );
        
      },
      (error) => {
        console.error("Error fetching payment details:", error);
      }
    );
  }
  

  paymentPortal() {
          if (this.dorm && this.dorm.payment_checkout_url) {
            window.open(this.dorm.payment_checkout_url, '_blank');
          } else {
            console.error("Payment checkout URL not found in response");
          }
  }
  
  

  closeDialog(): void {
    this.dialogRef.close(); // Close the dialog
  }


}
