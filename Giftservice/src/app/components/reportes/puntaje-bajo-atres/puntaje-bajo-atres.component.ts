import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LowScoreOneToThree } from '../../../models/lowScoreOneToThree';
import { CommonModule } from '@angular/common';
import { ReviewsService } from '../../../services/reviews.service';

@Component({
  selector: 'app-puntaje-bajo-atres',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './puntaje-bajo-atres.component.html',
  styleUrl: './puntaje-bajo-atres.component.css',
})
export class PuntajeBajoATresComponent implements OnInit {
  dataSource: MatTableDataSource<LowScoreOneToThree> =
    new MatTableDataSource<LowScoreOneToThree>();

  displayedColumns: string[] = [
    'idProducto',
    'nombreProducto',
    'puntaje',
  ];

  constructor(private rS: ReviewsService) {}

  ngOnInit(): void {
    this.rS.getProductByLowScore().subscribe((data) => {
      this.dataSource.data = data;
    });
  }
}
