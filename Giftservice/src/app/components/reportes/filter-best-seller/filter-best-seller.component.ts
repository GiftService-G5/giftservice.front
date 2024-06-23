import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PurchaseDetailService } from '../../../services/purchase-detail.service';

@Component({
  selector: 'app-filter-best-seller',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './filter-best-seller.component.html',
  styleUrl: './filter-best-seller.component.css'
})
export class FilterBestSellerComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private pdS: PurchaseDetailService) {Chart.register(...registerables);}

  ngOnInit(): void {
    this.pdS.getBestProductSales().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.productId.toString());
      this.barChartData = [
        {
          data: data.map((item) => item.totalSales),
          label: 'Productos más vendidos en la plataforma',
          backgroundColor: [
            '#0094d3',
            '#4169c7',
            '#0000CD',
            '#9BBB59',
            '#8064A2',
            '#4BACC6',
            '#4F81BC',
            '#C0504D',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
