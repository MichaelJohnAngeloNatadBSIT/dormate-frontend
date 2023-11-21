import { HttpErrorResponse } from '@angular/common/http';
import { Component,Inject, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ToastrService } from 'ngx-toastr';
import { GeocoderResponse } from 'src/app/models/geocoder-response.model';
import { GeocodingService } from 'src/app/services/geocoding.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'; 
import { ScheduleService } from 'src/app/services/schedule.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-schedule-dialog',
  templateUrl: './info-schedule-dialog.component.html',
  styleUrls: ['./info-schedule-dialog.component.css']
})
export class InfoScheduleDialogComponent implements OnInit{
  form: any ;
  constructor(
    public dialogRef: MatDialogRef<InfoScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private geocodingService: GeocodingService,
    private toastr: ToastrService,
    private scheduleService: ScheduleService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      description: ['', Validators.maxLength(100)],
      schedule_date: ['', Validators.required],
    });
    console.log(this.data.user.first_name+" "+this.data.user.last_name);
    console.log(this.data.dorm.title);
  }

  scheduleVisit(){
    const data = {
      dorm_id: this.data.dorm._id,
      tenant_id: this.data.user.id,
      landlord_id: this.data.dorm.user_id,
      user_full_name: this.data.user.first_name+ " " +this.data.user.last_name,
      dorm_title: this.data.dorm.title,
      description: this.form.get('description').value,
      schedule_date: this.form.get('schedule_date').value,
    };
    this.scheduleService.createSchedule(data)
    .subscribe({
      next: (res) => {
        console.log(res);
        // this.submitted = true;
        this.dialog.closeAll();
        this.router.navigate(['/profile'])
      },
      error: (e) => console.error(e)
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
    }


  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  mapZoom = 12;
  mapCenter: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
  };

  markerInfoContent = '';
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  geocoderWorking = false;
  geolocationWorking = false;

  address: string;
  formattedAddress?: string | null = null;
  locationCoords?: google.maps.LatLng | null = null;

  get isWorking(): boolean {
    return this.geolocationWorking || this.geocoderWorking;
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  getCurrentLocation() {
    this.geolocationWorking = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.geolocationWorking = false;
  
        const point: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
  
        this.geocoderWorking = true;
        this.geocodingService
          .geocodeLatLng(point)
          .then((response: GeocoderResponse) => {
            if (response.status === 'OK' && response.results?.length) {
              const value = response.results[0];
  
              this.locationCoords = new google.maps.LatLng(point);
  
              this.mapCenter = new google.maps.LatLng(point);
              this.map.panTo(point);
  
              this.address = value.formatted_address;
              this.formattedAddress = value.formatted_address;
              this.markerInfoContent = value.formatted_address;
  
              this.markerOptions = {
                draggable: true,
                animation: google.maps.Animation.DROP,
              };
            } else {
              this.toastr.error(response.error_message, response.status);
            }
          })
          .finally(() => {
            this.geocoderWorking = false;
          });
      },
      (error) => {
        this.geolocationWorking = false;
  
        if (error.PERMISSION_DENIED) {
          this.toastr.error("Couldn't get your location", 'Permission denied');
        } else if (error.POSITION_UNAVAILABLE) {
          this.toastr.error(
            "Couldn't get your location",
            'Position unavailable'
          );
        } else if (error.TIMEOUT) {
          this.toastr.error("Couldn't get your location", 'Timed out');
        } else {
          this.toastr.error(error.message, `Error: ${error.code}`);
        }
      },
      { enableHighAccuracy: true }
    );
  }

  findAddress() {
    if (!this.address || this.address.length === 0) {
      return;
    }
  
    this.geocoderWorking = true;
    this.geocodingService
      .getLocation(this.address)
      .subscribe(
        (response: GeocoderResponse) => {
          if (response.status === 'OK' && response.results?.length) {
            const location = response.results[0];
            const loc: any = location.geometry.location;
  
            this.locationCoords = new google.maps.LatLng(loc.lat, loc.lng);
  
            this.mapCenter = location.geometry.location;
  
            setTimeout(() => {
              if (this.map !== undefined) {
                this.map.panTo(location.geometry.location);
              }
            }, 500);
  
            this.address = location.formatted_address;
            this.formattedAddress = location.formatted_address;
            this.markerInfoContent = location.formatted_address;
  
            this.markerOptions = {
              draggable: true,
              animation: google.maps.Animation.DROP,
            };
          } else {
            this.toastr.error(response.error_message, response.status);
          }
        },
        (err: HttpErrorResponse) => {
          console.error('geocoder error', err);
        }
      )
      .add(() => {
        this.geocoderWorking = false;
      });
  }

  onMapDragEnd(event: google.maps.MapMouseEvent) {
    const point: google.maps.LatLngLiteral = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
  
    this.geocoderWorking = true;
    this.geocodingService
      .geocodeLatLng(point)
      .then((response: GeocoderResponse) => {
        if (response.status === 'OK') {
          if (response.results.length) {
            const value = response.results[0];
  
            this.locationCoords = new google.maps.LatLng(point);
  
            this.mapCenter = new google.maps.LatLng(point);
            this.map.panTo(point);
  
            this.address = value.formatted_address;
            this.formattedAddress = value.formatted_address;
  
            this.markerOptions = {
              draggable: true,
              animation: google.maps.Animation.DROP,
            };
  
            this.markerInfoContent = value.formatted_address;
          }
        }
      })
      .finally(() => {
        this.geocoderWorking = false;
      });
  }

}
