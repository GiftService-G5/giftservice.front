import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PurchaseService } from '../../../services/purchase.service';

@Component({
  selector: 'app-cantidad-de-tipo-de-entrega-por-compra',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './cantidad-de-tipo-de-entrega-por-compra.component.html',
  styleUrl: './cantidad-de-tipo-de-entrega-por-compra.component.css',
})
export class CantidadDeTipoDeEntregaPorCompraComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private pS:PurchaseService) {Chart.register(...registerables);}

  ngOnInit(): void {
    this.pS.getQuantityByTypeDelivery().subscribe((data)=>{
      this.barChartLabels = data.map((item) => item.nameTypeDelivery)
      this.barChartData = [
        {
          data: data.map((item) => item.quantityTypeDelivery),
          label: 'Cantidad de tipo de delivery',
          backgroundColor: ['#18729C', '#00CFF3'],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1
        }
      ]
    })
  }
}
