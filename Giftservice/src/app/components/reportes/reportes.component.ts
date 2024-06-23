import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PuntajeBajoATresComponent } from './puntaje-bajo-atres/puntaje-bajo-atres.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, PuntajeBajoATresComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
      
  }
}
