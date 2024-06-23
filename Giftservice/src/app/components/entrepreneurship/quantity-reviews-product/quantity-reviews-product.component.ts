import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EntrepreneurshipService } from '../../../services/entrepreneurship.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quantity-reviews-product',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './quantity-reviews-product.component.html',
  styleUrl: './quantity-reviews-product.component.css'
})
export class QuantityReviewsProductComponent {
  id!: number;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType:ChartType = 'doughnut';
  barChartType: ChartType = 'pie';

  //barChartType: ChartType = 'line';

  //barChartType: ChartType = 'bar';

  //barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartData: ChartDataset[] = []

  constructor(private eS: EntrepreneurshipService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.eS.quantityReviewsByProduct(this.id).subscribe(data => {
      console.log(data);
      
      this.barChartLabels = data.map(item => item.nameProduct)
      this.barChartData = [
        {
          data: data.map(item => item.quantityReview),
          label: 'Cantidad de comentarios de cada producto',
          backgroundColor: ['blue', 'red', 'green', 'white', '#30B81A',],
          borderColor: 'rgba(173,216,230,1)',
          borderWidth: 1,
        }
      ]
    })
  }
}
