import { Component, OnInit,ViewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';

import { ReviewsService } from '../../../services/reviews.service';
import { ProductsService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { UserWeb } from '../../../models/UserWeb';
import { Reviews } from '../../../models/reviews';
import { InsertReviewsComponent } from '../insert-reviews/insert-reviews.component';


@Component({
  selector: 'app-list-reviews',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatPaginator,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatTooltip,
    RouterLink,
    MatSelectModule,
    RouterOutlet
  ],
  templateUrl: './list-reviews.component.html',
  styleUrl: './list-reviews.component.css'
})
export class ListReviewsComponent implements OnInit {

  displayedColumns: string[] = [
    'id', 
    'date', 
    'point', 
    'comentari',
    'product',
    'user',
    'acciones'
  ];
  ListProducts: Product[] = []
  ListUsers: UserWeb[] = []
  dataSource: MatTableDataSource<Reviews> = new MatTableDataSource();
  @ViewChild(MatPaginator,{static:true}) paginator !: MatPaginator
  insertado: boolean = false

  constructor(
    private reS: ReviewsService,
    private matdialog: MatDialog,
    private pS: ProductsService
  ){}
  ngOnInit(): void {
    this.reS.list().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator
    })
    this.reS.getList().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator
    })

    this.pS.list().subscribe((data) => {
      this.ListProducts = data;
    });
  }
  deletee(idDelte: number){
    this.reS.delete(idDelte).subscribe((data)=>{
      this.reS.list().subscribe((data)=>{
        this.reS.setList(data)
      })
    })
  }
  OpenModalInsert(){
    this.matdialog.open(InsertReviewsComponent,{
      data:{id:0},width:'60%',height:'75%'
    })
  }
  
}

