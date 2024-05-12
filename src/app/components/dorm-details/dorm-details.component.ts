import { Component, Input, OnInit } from '@angular/core';
import { Dorm } from 'src/app/models/dorms.model';
import { DormService } from 'src/app/services/dorm.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dorm-details',
  templateUrl: './dorm-details.component.html',
  styleUrls: ['./dorm-details.component.css']
})
export class DormDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentDorm: Dorm = {
    title: '',
    description: '',
    for_rent: false,
    publish: false,
  };

  message = ''
  
  constructor(
    private dormService: DormService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getDorm(this.route.snapshot.params["id"]);
    }
  }

  getDorm(id: string): void {
    this.dormService.get(id)
      .subscribe({
        next: (data) => {
          this.currentDorm = data;
        },
        error: (e) => console.error(e)
      });
  }

  updateForRent(status: boolean): void {
    const data = {
      title: this.currentDorm.title,
      description: this.currentDorm.description,
      for_rent: status
    };

    this.message = '';

    this.dormService.update(this.currentDorm._id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentDorm.for_rent = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateDorm(): void {
    this.message = '';

    this.dormService.update(this.currentDorm._id, this.currentDorm)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This dorm listing was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteDorm(): void {
    this.dormService.delete(this.currentDorm._id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dorms']);
        },
        error: (e) => console.error(e)
      });
  }

}
