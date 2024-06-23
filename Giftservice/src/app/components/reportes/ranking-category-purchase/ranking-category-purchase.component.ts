import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PurchaseDetailService } from '../../../services/purchase-detail.service';

@Component({
  selector: 'app-ranking-category-purchase',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './ranking-category-purchase.component.html',
  styleUrl: './ranking-category-purchase.component.css'
})
export class RankingCategoryPurchaseComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = []; 
  barChartType: ChartType = 'bar'; 

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private pdS: PurchaseDetailService) { }
  ngOnInit(): void {
    this.pdS.getRankingCategoryPurchase().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nameCategory)
      this.barChartData = [
        {
          data: data.map((item) => item.total),
          label: 'Ranking de categorias',
          backgroundColor: [
            '#08FF57','#FF9308','#089AFF'
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 2
        }
      ]
    })
  }
}
