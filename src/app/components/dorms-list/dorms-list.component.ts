import { Component, OnInit } from '@angular/core';
import { Dorm } from 'src/app/models/dorms.model';
import { DormService } from 'src/app/services/dorm.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from 'src/app/interface/user';
import { SwiperOptions } from 'swiper';
import { InfoScheduleDialogComponent } from 'src/app/dialogs/info-schedule-dialog/info-schedule-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageZoomComponent } from 'src/app/dialogs/image-zoom/image-zoom.component';
import { Router } from '@angular/router';
import { FADEINOUT } from './fade-in-fade-out.animation';
import { UserService } from 'src/app/services/user.service';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export class Barangay {
  constructor(public name: string) {}
}

export class PriceRange {
  constructor(public name: string, public minValue: number, public maxValue: number,) {}
}


@Component({
  selector: 'app-dorms-list',
  templateUrl: './dorms-list.component.html',
  animations: [FADEINOUT],
  styleUrls: ['./dorms-list.component.css'],
})
export class DormsListComponent implements OnInit {
  rent: any = [
    {
      value: "Low to High",
   },
    {
      value: "High to Low",
    },
  ];
  selectedRentSort: string = "Low to High";
  selectedRentControl = new FormControl(this.selectedRentSort);

  barangayCtrl = new FormControl();
  filteredBarangay: Observable<Barangay[]>;

  barangay_list: Barangay[] = [
    { name: 'Asinan' },
    { name: 'Banicain' },
    { name: 'Barreto' },
    { name: 'East Bajac-bajac' },
    { name: 'East Tapinac' },
    { name: 'Gordon Heights' },
    { name: 'Kalaklan' },
    { name: 'Mabayuan' },
    { name: 'New Cabalan' },
    { name: 'New Kababae' },
    { name: 'New Kalalake' },
    { name: 'Old Cabalan' },
    { name: 'Pag-asa' },
    { name: 'Santa Rita' },
    { name: 'West Bajac-bajac' },
    { name: 'West Tapinac' },
  ];

  selectedStatus:  number;  
  eventEditForm: FormGroup;
  public toggleForm:boolean;
  searchType: string = 'barangay'; // Default search type

  dorms?: Dorm[];
  currentDorm: Dorm = {};
  currentIndex = -1;
  title = '';
  currentUser: User;
  currentUserTemp: User;
  user: User;
  userImage: any;
  dorm: Dorm;

  constructor(
    private dormService: DormService,
    private tokenService: TokenStorageService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.filteredBarangay = this.barangayCtrl.valueChanges.pipe(
      startWith(''),
      map((barangay) =>
        barangay ? this.filterBarangay(barangay) : this.barangay_list.slice()
      )
    );

  }

  ngOnInit(): void {
    this.retrieveDorms();
    this.currentUser  = this.tokenService.getUser();
    console.log(this.currentUser);

    // if(this.currentUserTemp.id ){
    //   this.userService.retrieveUserWithId(this.currentUserTemp.id).subscribe((data)=>{
    //     this.currentUser = data
    //   });
    // }

    
    this.eventEditForm = new FormGroup({          
      'completed': new FormControl()
      });      
    this.selectedStatus = 2;
  }

  filterBarangay(name: string): Barangay[] {
    let arr = this.barangay_list.filter(
      (barangay) => barangay.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
    return arr.length ? arr : [{ name: 'No Item found' }];
  }

  toggleSearchType() {
    this.searchType = this.searchType === 'barangay' ? 'priceRange' : 'barangay';
  }

  retrieveDorms(): void {
    this.dormService.findByTitleWithRentLowToHigh(this.title).subscribe({
      next: (data) => {
        this.dorms = data;
      },
      error: (e) => console.error(e),
    });
  }

  searchTitle(): void {
    this.currentDorm = {};
    this.currentIndex = -1;

    this.dormService.findByTitleWithRentLowToHigh(this.title).subscribe({
      next: (data) => {
        this.dorms = data;
      },
      error: (e) => console.error(e),
    });
  }

  onRentSortChange() {
    if (this.selectedRentSort === 'Low to High') {
      this.dormService.findByTitleWithRentLowToHigh(this.title).subscribe({
        next: (data) => {
          this.dorms = data;
        },
        error: (e) => console.error(e),
      });

    } else if (this.selectedRentSort === 'High to Low') {
      this.dormService.findByTitleWithRentHighToLow(this.title).subscribe({
        next: (data) => {
          this.dorms = data;
        },
        error: (e) => console.error(e),
      });
    }
  }

  openInfoSchedDialog(dorm: Dorm) {
    if(this.currentUser.verified == true){
    var isAuthenticated = this.tokenService.isLoggedIn();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    } else {

        // if(this.currentUser.id == dorm.user_id){ 
          let dialogRef = this.dialog.open(InfoScheduleDialogComponent, {
            width: '600px',
            height: '400px',
            data: { user: this.currentUser, dorm: dorm },
          });
        // }else{
        //   this.showSnackbarTopPosition('Please Make Your account Verified by Uploading a Valid ID','Ok', '10000')
        // }
    }

    }
    else{
      this.showSnackbarTopPosition('Please Make Your account Verified by Uploading a Valid ID','Ok', '10000')
      this.router.navigate(['/profile']);
    }
  }

  showSnackbarTopPosition(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: duration,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['custom-style']
    });
  }

  openImageZoomDialog(images: any) {
    let dialogRef = this.dialog.open(ImageZoomComponent, {
      width: '900px',
      height: '70vh',
      data: images,
    });
  }

  visitProfile(user_id: any) {
    this.router.navigate(['visit-profile'], { state: { user_id: user_id } });
  }

  goToDormDetail(dormId: string) {
    this.router.navigate(['dorm-detail', dormId]);
  }

  config: SwiperOptions = {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 30,
  };
}
