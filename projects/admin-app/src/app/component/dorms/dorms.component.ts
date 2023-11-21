import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'projects/admin-app/services/admin.service';
import { Dorm } from 'src/app/models/dorms.model';
import { DormDialogComponent } from '../../dialogs/dorm-dialog/dorm-dialog.component';

@Component({
  selector: 'app-dorms',
  templateUrl: './dorms.component.html',
  styleUrls: ['./dorms.component.css']
})
export class DormsComponent implements OnInit {
  dorms: Dorm[];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
  ){

  }

  ngOnInit(): void {
    this.retrieveDorms();
  }

  retrieveDorms(){
    this.adminService.getAllDorm().subscribe({
      next: (data) => {
        this.dorms = data;
      },
      error: (e) => console.error(e)
    });
  }

  openDormDialog(dorm){
    let dialogRef = this.dialog.open(DormDialogComponent, { 
      width: '700px', 
      height: '80vh',
      data: dorm
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveDorms()
     }); 
  }

}
