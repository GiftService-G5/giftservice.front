import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../models/product';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContainer, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Reviews } from '../../../models/reviews';
import { ReviewsService } from '../../../services/reviews.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../../services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { now } from 'moment';
import { UserWeb } from '../../../models/UserWeb';
import { UserwebService } from '../../../services/userweb.service';

interface DialogData {
  idProduct: number;
  urlImage:string
}

@Component({
  selector: 'app-insert-reviews',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContainer,
    MatSelectModule,
    MatIconModule,
    MatProgressBar,
    MatDividerModule
  ],
  templateUrl: './insert-reviews.component.html',
  styleUrl: './insert-reviews.component.css'
})
export class InsertReviewsComponent implements OnInit{
  form: FormGroup = new FormGroup({})
  product: Product= new Product()
  review: Reviews = new Reviews()
  userloged: UserWeb =new UserWeb()
  // edicion: boolean = false;
  id: number = 0;
  urlImage: string = ''
  titulo: string = "Registrar"

  stars: boolean[] = [true, true, true, false, false];
  rating: number = 3;

  listaUsuarios: UserWeb[] = [];

  constructor(
    private fb: FormBuilder,
    private rS: ReviewsService,
    private pS: ProductsService,
    private snackBar: MatSnackBar,
    private uS: UserwebService,
    public dialogRef: MatDialogRef<InsertReviewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){}

  ngOnInit(): void {
    this.id = this.data.idProduct
    this.urlImage = this.data.urlImage

    this.pS.listId(this.id).subscribe((data)=>{
      this.product = data
    })
    
    this.form = this.fb.group({
      description: ['', [Validators.required,Validators.maxLength(50)]],
      frase: ['', [Validators.required,Validators.maxLength(20)]],
      
    })
    // this.uS.list().subscribe((data) => {
    //   this.listaUsuarios = data;
    // });

    this.uS.listId(1).subscribe((data) => {
      this.userloged = data;
    });
    
  }
  register(){

    if(this.form.valid && this.rating != 0){
      this.review.dateReviews = new Date(Date.now())
      this.review.scoreReviews = this.rating
      this.review.commentReviews = this.form.value.description
      this.review.titleReviews = this.form.value.frase
      this.review.users.idUser = this.userloged.idUser
      this.review.product.idProduct = this.id

      // console.log(this.review.users);
      // this.rS.insert(this.review).subscribe((data=>{
      //   this.rS.list().subscribe((data)=>{
      //     this.rS.setList(data);
      //   })
      // }))

      this.rS.insert(this.review);
      this.mostrarMensaje("Se registró correctamente el comentario");
    }
    else{
      this.mostrarMensaje("Debe ingresar todos los valores, u ocurrio un problema :(");
    }
  }
  rateProduct(rating: number): void {
    this.rating = rating; 
  }
  mostrarMensaje(ms: string) {
    let mensaje = ms
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }
}
