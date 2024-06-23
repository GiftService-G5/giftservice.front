import { Component, OnInit, ViewChild } from '@angular/core';



import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ListReviewsComponent } from './list-reviews/list-reviews.component';



@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    ListReviewsComponent
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit{
  constructor(public route:ActivatedRoute){}

  ngOnInit(): void {
    
  }
}
