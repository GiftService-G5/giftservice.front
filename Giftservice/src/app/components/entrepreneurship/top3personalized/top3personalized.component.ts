import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EntrepreneurshipService } from '../../../services/entrepreneurship.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top3personalized',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './top3personalized.component.html',
  styleUrl: './top3personalized.component.css'
})
export class Top3personalizedComponent {
  id!: number;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType:ChartType = 'doughnut';
  barChartType: ChartType = 'bar';

  //barChartType: ChartType = 'line';

  //barChartType: ChartType = 'bar';

  //barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartData: ChartDataset[] = []

  constructor(private eS: EntrepreneurshipService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.eS.findTop3PersonalizationsByEntrepreneurshipId(this.id).subscribe(data => {
      this.barChartLabels = data.map(item => item.namePersonalized)
      console.log(data);
      this.barChartData = [
        {
          data: data.map(item => item.quantityPersonalized),
          label: 'Tres personalizaciones más usadas en un emprendimiento',
          backgroundColor: ['blue', 'red', 'green'],
          borderColor: 'rgba(173,216,230,1)',
          borderWidth: 1,
        }
      ]
    })
  }
}
