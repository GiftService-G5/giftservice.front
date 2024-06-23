import { Component, OnInit } from '@angular/core'; 
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective} from 'ng2-charts'; 
import { PurchaseService } from '../../../services/purchase.service';

@Component({
  selector: 'app-ranking-payment-type-used',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './ranking-payment-type-used.component.html',
  styleUrls: ['./ranking-payment-type-used.component.css']
})
export class RankingPaymentTypeUsedComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };  
  barChartLabels: string[] = [];
 // barChartType: ChartType = 'doughnut';
  // barChartType: ChartType = 'polarArea';
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private pS: PurchaseService) {}

  ngOnInit(): void {
    this.pS.getRankingPaymentTypeUsed().subscribe((data) => {
      console.log(data);
      
      this.barChartLabels = data.map((item) => item.namePaymentType);
      this.barChartData = [
        {
          data: data.map((item) => item.total),
          label: 'Ranking de categorías',
          backgroundColor: ['#08FF57','#FF9308','#089AFF','#FF0848'],
          borderColor: 'rgba(173,206,155)',
          borderWidth: 1,
        }
      ];
    });
  }
}
