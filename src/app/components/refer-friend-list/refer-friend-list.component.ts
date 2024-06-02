import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interface/user';
import { Friend } from 'src/app/interface/friend';

@Component({
  selector: 'app-refer-friend-list',
  templateUrl: './refer-friend-list.component.html',
  styleUrls: ['./refer-friend-list.component.css']
})
export class ReferFriendListComponent {
  title = '';
  usersFriend?: User;
  referreredFriend: any[];
  userSender: any[];
  currentUser: User;
  currentUserId: string;
  requestedUserId: any;
  friends : Friend[];
  update_friend_list_data = {
    friend_approved: true
  };

  constructor(
    public dialogRef: MatDialogRef<ReferFriendListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.currentUser = this.data; 
    this.currentUserId = this.currentUser.id;
    this.retrieveUserFriendRequest(this.currentUser.id);
}

retrieveUserFriendRequest(userId: any): void {
  this.userService.retrieveUserFriendRequest(userId).subscribe({
    next: (data) => {
      this.usersFriend = data;
      this.friends = this.usersFriend.friend_list;
      console.log(this.friends)

    },
    error: (e) => console.error(e),
  });
}

referFriend(user: Friend){
  var userIdToUpdate;
  if(user.friend_user_id == this.currentUser.id){
    userIdToUpdate = user.requested_by_user_id;
  }
  else{
    userIdToUpdate = user.friend_user_id
  }

  this.referreredFriend = [{
    referral_friend_username: this.currentUser.username,
    referral_friend_user_id: this.currentUser.id,
    referral_friend_full_name: this.currentUser.first_name+ ' '+this.currentUser.last_name,
    referral_friend_verified: this.currentUser.verified,
    referral_friend_dorm_id: this.currentUser.dorm_id,
    referral_friend_dorm_title: this.currentUser.dorm_title,
    referred_by_friend: true
  }];

  this.userService.referFriend(userIdToUpdate, this.referreredFriend).subscribe({
    next: (data) => {

    },
    error: (e) => console.error(e),
  })
  
}

}
