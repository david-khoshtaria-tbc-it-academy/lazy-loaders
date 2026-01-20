import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ChartData {
  label: string;
  value: number;
}

@Component({
  selector: 'app-daily-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-chart.html',
  styleUrls: ['./daily-chart.scss']
})
export class DailyChartComponent {
  data = input.required<ChartData[]>();
  
  maxVal = computed(() => Math.max(...this.data().map(d => d.value), 1));

  chartBars = computed(() => {
    return this.data().map(item => ({
      ...item,
      height: (item.value / this.maxVal()) * 100
    }));
  });
}