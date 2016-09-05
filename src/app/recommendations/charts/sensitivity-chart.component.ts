import {Component, OnChanges, Input} from '@angular/core';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {Recommendation} from './../../dtos/recommendation.dto';

@Component({
    selector: 'cs-recommendation-sensitivity-chart',
    template: require('./sensitivity-chart.component.html'),
    styles: [require('./sensitivity-chart.component.less')],
    directives: [CHART_DIRECTIVES]
})

export class RecommendationSensitivityChartComponent implements OnChanges {

  @Input()
  recommendations: Recommendation[];

  private chartLabels: number[] = [];
  private chartData: any[] = [{data: [], label: 'Monthly Cost', backgroundColor: '#1CA8DD'}];

  private chartOptions: any = {
    responsive: true,
    animation: false,
    cutoutPercentage: 75,
    legend: {
      position: 'left'
    }
  };

  constructor() {

  }

  ngOnChanges(changes: any): void {
    if (changes.recommendations.currentValue) {
      this.fillChart(changes.recommendations.currentValue);
    }
  }

  fillChart(recommendationArray: Recommendation[]) {
    this.chartLabels = [];
    this.chartData[0].data = [];

    for (let recommendation of recommendationArray.sort((a, b) => { if (a.num_simultaneous_users >= b.num_simultaneous_users) {
      return 1;
    } else {
      return -1;
    }; })) {
      this.chartLabels.push(recommendation.num_simultaneous_users);
      this.chartData[0].data.push(recommendation.vm_cost);
    }
  }

}
