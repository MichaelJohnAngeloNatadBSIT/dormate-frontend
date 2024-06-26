export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    address: string;
    first_name: string;
    last_name: string;
    user_image: string;
    image_id: String;
    mobile_number: String;
    verified: any;
    dorm_id: string;
    dorm_title: string;
    dorm_landlord_user_id: string;
    is_tenant: boolean;
    is_landlord: boolean;
    as_tenant: boolean;
    as_landlord: boolean;
    dorm_tenant_date: Date;
    friend_list: any[];
    referral: any[];
}


