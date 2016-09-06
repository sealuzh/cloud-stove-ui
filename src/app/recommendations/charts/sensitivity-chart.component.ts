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

  chartLabels: number[] = [];
  chartData: any[] = [{
      data: [],
      label: 'Monthly Cost',
      backgroundColor: '#1CA8DD',
      borderWidth: 0,
      pointBackgroundColor: '#1CA8DD',
      pointBorderColor: '#1CA8DD',
      pointBorderWidth: 1,
      lineTension: 0,
      fill: false
    }];

  chartOptions: any = {
    responsive: true,
    animation: false,
    cutoutPercentage: 75,
    legend: {
      position: 'left'
    },
    scales: {
      yAxes: [{
          ticks: {
            suggestedMin: 100,
            suggestedMax: 20000
          }
      }]
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

    let array = recommendationArray.slice(0); // clone array to prevent sorting issues
    array.sort((a, b) => { return a.num_simultaneous_users >= b.num_simultaneous_users ? 1 : -1; });

    for (let recommendation of array) {
      this.chartLabels.push(recommendation.num_simultaneous_users);
      this.chartData[0].data.push(recommendation.vm_cost);
    }
  }

}