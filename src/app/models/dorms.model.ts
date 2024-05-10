export class Dorm {
    _id?: any;
    user_id?: string;
    username?: string;
    title?: string;
    description?: string;
    lessor?: string;
    address?: string;
    bedroom?: any;
    bathroom?: any;
    vacancy?: any;
    rent?: any;
    for_rent?: boolean;
    published?: boolean;
    dorm_images?: any;
    contact_number?: any;
    visit_counter?: any;
    payment_id?: any;
    payment_checkout_url?: any;
    payment_reference_number?: any;
    payment_status?: any;
    tenants?: any[];
}

// interface Tenant {
//     tenant_username?: string;
//     tenant_user_id?: string;
//     tenant_full_name?: string;
//     tenant_contact_number?: string;
//     tenant_address?: string;
//     verified?: boolean;
//     approve_tenant?: boolean;
// }
