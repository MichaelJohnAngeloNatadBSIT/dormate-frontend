export interface Friend {
    friend_username?: string;
    friend_user_id?: string;
    friend_full_name?: string;
    friend_contact_number?: string;
    tenant_user_image?: string;
    friend_verified?: boolean;
    friend_approved?: boolean;
    requested_by_user_id: string,
    requested_by_username: string
  }

//   [
//     {
//     "friend_username": "raph1212",
//     "friend_user_id": "655ea6532b6ea861c62465ab",
//     "friend_full_name": "John Raphael Natad",
//     "friend_contact_number": "9123456789",
//     "friend_verified": true,
//     "friend_approved": false,
//     "requested_by_user_id": "655c8f5ec50398845a3590b4",
//     "requested_by_username": "hakaylo"
//     }
//   ]

