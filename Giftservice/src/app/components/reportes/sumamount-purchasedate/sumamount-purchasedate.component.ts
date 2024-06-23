import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PurchaseDetailService } from '../../../services/purchase-detail.service';
import moment from 'moment';
import { SumAmountByPurchaseDateDTO } from '../../../models/SumAmountByPurchaseDateDTO';

@Component({
  selector: 'app-sumamount-purchasedate',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    BaseChartDirective,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './sumamount-purchasedate.component.html',
  styleUrl: './sumamount-purchasedate.component.css'
})
export class SumamountPurchasedateComponent implements OnInit{
  form: FormGroup;
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

  constructor(private pdS: PurchaseDetailService, private fb: FormBuilder) {
    Chart.register(...registerables);
    this.form = this.fb.group({
      fecha: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const fecha = moment(this.form.value.fecha).format('YYYY-MM-DD');
    this.pdS.getTotalProductosComprados(fecha).subscribe((data: SumAmountByPurchaseDateDTO) => {
      this.barChartLabels = ['Total Productos Comprados'];
      this.barChartData = [
        {
          data: [data.totalProductSales],
          label: 'Total Productos Comprados en la Fecha',
          backgroundColor: '#B533FF',
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
