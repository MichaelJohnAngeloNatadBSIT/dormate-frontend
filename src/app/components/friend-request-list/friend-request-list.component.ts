import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interface/user';
import { Friend } from 'src/app/interface/friend';

@Component({
  selector: 'app-friend-request-list',
  templateUrl: './friend-request-list.component.html',
  styleUrls: ['./friend-request-list.component.css']
})
export class FriendRequestListComponent implements OnInit {

  
  title = '';
  usersFriendRequest?: User;
  user: any[];
  userSender: any[];
  currentUser: User;
  currentUserId: string;
  requestedUserId: any;
  friends : Friend[];
  update_friend_list_data = {
    friend_approved: true
  };

  constructor(
    public dialogRef: MatDialogRef<FriendRequestListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ){}

  ngOnInit(): void {

      this.currentUser = this.data; 
      this.currentUserId = this.currentUser.id;
      this.retrieveUserFriendRequest(this.currentUser.id);
  }

  // retrieveUserFriendRequest(userId: any): void {
  //   this.userService.getUserFriendRequest(userId).subscribe({
  //     next: (data) => {
  //       this.usersFriendRequest = data;
  //     },
  //     error: (e) => console.error(e),
  //   });
  // }

  retrieveUserFriendRequest(userId: any): void {
    this.userService.retrieveUserFriendRequest(userId).subscribe({
      next: (data) => {
        this.usersFriendRequest = data;
        this.friends = this.usersFriendRequest.friend_list;

      },
      error: (e) => console.error(e),
    });
  }

  acceptFriendRequest(user_id: any, requested_by_user_id: any){

    this.userService.acceptFriendRequest(user_id, requested_by_user_id, this.update_friend_list_data).subscribe({
      next: (data) => {

      },
      error: (e) => console.error(e),
    })
    
  }


  // searchFriendRequest(userId: any){
  //     this.userService.findFriendRequest(userId, this.title).subscribe({
  //     next: (data) => {
  //       this.usersFriendRequest = data;
  //     },
  //     error: (e) => console.error(e),
  //   });
  // }
}
