import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-add-friend-list',
  templateUrl: './add-friend-list.component.html',
  styleUrls: ['./add-friend-list.component.css']
})
export class AddFriendListComponent implements OnInit{

  title = '';
  usersVerified?: User[];
  user: any[];
  userSender: any[];
  currentUser: User;

  constructor(
    public dialogRef: MatDialogRef<AddFriendListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ){}

  ngOnInit(): void {

      this.currentUser = this.data; 
      this.retrieveUsers(this.currentUser.id);
  }

  retrieveUsers(userId: any): void {
    this.userService.getFriendToAdd(userId).subscribe({
      next: (data) => {
        this.usersVerified = data;
       
      },
      error: (e) => console.error(e),
    });
  }

  addAsFriend(user: any){
    this.user = [{
      friend_user_id: user._id,
      friend_username: user.username,
      friend_full_name: user.first_name + ' '+user.last_name,
      friend_contact_number: user.mobile_number,
      friend_verified: user.verified,
      friend_approved: false,
      requested_by_user_id: this.currentUser.id,
      requested_by_username: this.currentUser.username,
    }];

    this.userService.addFriend(this.data.id, this.user).subscribe({
      next: (res) => {

      },
      error: (e) => console.error(e)
    });

    // this.userSender = [{
    //   friend_user_id: this.currentUser.id,
    //   friend_username: this.currentUser.username,
    //   friend_full_name: this.currentUser.first_name + ' '+this.currentUser.last_name,
    //   friend_contact_number: this.currentUser.mobile_number,
    //   friend_verified: this.currentUser.verified,
    //   friend_approved: false,
    //   requested_by_user_id: this.currentUser.id,
    //   requested_by_username: this.currentUser.username,
    // }];

    this.userService.addFriend(user._id, this.user).subscribe({
      next: (res) => {

      },
      error: (e) => console.error(e)
    });
    
  }

  searchFriend(){
      this.userService.findFriend(this.currentUser.id,this.title).subscribe({
      next: (data) => {
        this.usersVerified = data;
      },
      error: (e) => console.error(e),
    });
  }

}
