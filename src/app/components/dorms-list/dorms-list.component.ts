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

export class Barangay {
  constructor(public name: string) {}
}

export class PriceRange {
  constructor(public name: string, public minValue: number, public maxValue: number) {}
}


@Component({
  selector: 'app-dorms-list',
  templateUrl: './dorms-list.component.html',
  animations: [FADEINOUT],
  styleUrls: ['./dorms-list.component.css'],
})
export class DormsListComponent implements OnInit {

  // length: number;

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

    // Define FormControl for price range
    priceRangeCtrl =  new FormControl();
    filteredPriceRange: Observable<PriceRange[]>; 
    priceRange_list: PriceRange[] = [
      { name: '₱500-₱1000', minValue: 500, maxValue: 1000},
      { name: '₱1001-₱1500', minValue: 1001, maxValue: 1500},
      { name: '₱1501-₱2000', minValue: 1501, maxValue: 2000},
      { name: '₱2001-₱2500', minValue: 2001, maxValue: 2500},
      { name: '₱2501-₱3000', minValue: 2501, maxValue: 3000},
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
  user: User;
  userImage: any;
  dorm: Dorm;

  constructor(
    private dormService: DormService,
    private tokenService: TokenStorageService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {
    //this.barangayCtrl = new FormControl();
    this.filteredBarangay = this.barangayCtrl.valueChanges.pipe(
      startWith(''),
      map((barangay) =>
        barangay ? this.filterBarangay(barangay) : this.barangay_list.slice()
      )
    );

    this.filteredPriceRange = this.priceRangeCtrl.valueChanges.pipe(
      startWith(''),
      map((price) =>
        price ? this.filterPriceRange(price) : this.priceRange_list.slice()
      )
    );
  }

  ngOnInit(): void {
    this.retrieveDorms();
    this.currentUser = this.tokenService.getUser();
    
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
  filterPriceRange(name: string): PriceRange[] {
    let arr = this.priceRange_list.filter(
      (price) => price.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
    return arr.length ? arr : [{ name: 'No Item found', minValue: 0, maxValue: 0 }];
  }

  toggleSearchType() {
    this.searchType = this.searchType === 'barangay' ? 'priceRange' : 'barangay';
  }

  retrieveDorms(): void {
    this.dormService.getAllApproved().subscribe({
      next: (data) => {
        this.dorms = data;
      },
      error: (e) => console.error(e),
    });
  }

  searchTitle(): void {
    this.currentDorm = {};
    this.currentIndex = -1;

    this.dormService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.dorms = data;
      },
      error: (e) => console.error(e),
    });
  }

  openInfoSchedDialog(dorm: Dorm) {
    var isAuthenticated = this.tokenService.isLoggedIn();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    } else {
      let dialogRef = this.dialog.open(InfoScheduleDialogComponent, {
        width: '600px',
        height: '400px',
        data: { user: this.currentUser, dorm: dorm },
      });
    }
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
