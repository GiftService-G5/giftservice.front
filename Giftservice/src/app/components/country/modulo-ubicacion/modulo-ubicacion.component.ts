import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CityComponent } from '../city/city.component';
import { CountryComponent } from '../country.component';

@Component({
  selector: 'app-modulo-ubicacion',
  standalone: true,
  imports: [
    MatTabsModule,
    RouterOutlet,
    CountryComponent,
    CityComponent
  ],
  templateUrl: './modulo-ubicacion.component.html',
  styleUrl: './modulo-ubicacion.component.css'
})
export class ModuloUbicacionComponent implements OnInit{
  constructor(public route:ActivatedRoute,private _snackBar: MatSnackBar){}
  ngOnInit(): void {
    
  }
}
