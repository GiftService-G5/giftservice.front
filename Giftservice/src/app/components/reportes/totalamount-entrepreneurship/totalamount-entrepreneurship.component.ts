import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PurchaseDetailService } from '../../../services/purchase-detail.service';

@Component({
  selector: 'app-totalamount-entrepreneurship',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './totalamount-entrepreneurship.component.html',
  styleUrl: './totalamount-entrepreneurship.component.css'
})
export class TotalamountEntrepreneurshipComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private pdS: PurchaseDetailService) {Chart.register(...registerables);}

  ngOnInit(): void {
    this.pdS.getCantidadTotalProductosEmprendimiento().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nameEntrepreneurship);
      this.barChartData = [
        {
          data: data.map((item) => item.totalAmount),
          label: 'Productos más vendidos en la plataforma',
          backgroundColor: [
            '#A973CD',
            '#D8BFFF',
            '#E597D7',
            '#FF3DDC',
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
