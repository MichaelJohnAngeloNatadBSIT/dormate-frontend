import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{message: string},
    public dialogRef: MatDialogRef<EventDialogComponent>
  ){}

  onOkClick(): void {
    this.dialogRef.close(true);
  }

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }

}
