import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = 0;
  @Input() starCount: number = 5;
  @Input() isClickable: boolean = true;
  @Output() ratingUpdated = new EventEmitter<number>();

  stars: string[] = [];

  ngOnInit() {
    this.calculateStars();
  }

  calculateStars() {
    this.stars = Array(this.starCount).fill('star_border');
    for (let i = 0; i < this.rating; i++) {
      this.stars[i] = 'star';
    }
  }

  rate(rating: number) {
    if (this.isClickable) {
      this.rating = rating;
      this.ratingUpdated.emit(this.rating);
      this.calculateStars();
    }
  }
}
