import {Component, OnChanges, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {Recommendation} from './../../dtos/recommendation.dto';

@Component({
    selector: 'cs-recommendation-sensitivity-chart',
    template: require('./sensitivity-chart.component.html'),
    styles: [require('./sensitivity-chart.component.less')],
    directives: [ROUTER_DIRECTIVES, CHART_DIRECTIVES]
})

export class RecommendationSensitivityChartComponent implements OnChanges {

    @Input()
    recommendations: Recommendation[];

    private chartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    private chartData: number[] = [350, 450, 100];
    private chartOptions: any = {
      responsive: true,
      animation: false,
      cutoutPercentage: 75,
      legend: {
        position: 'left'
      }
    };

    private chartColors: any = [
      {
        borderWidth: 5,
        borderColor: '#252830',
        backgroundColor: ['#1CA8DD', '#1BC98E', '#9F86FF', '#E4D836', '#E64759', '#aaa', '#fff']
      }
    ];

    constructor() {

    }

    ngOnChanges(changes: any): void {
      if (changes.recommendations.currentValue) {
        this.fillChart(changes.recommendations.currentValue);
      }
    }

    fillChart(recommendations: Recommendation[]) {
      this.chartLabels = [];
      this.chartData = [];

      for (let recommendation of recommendations) {
        
      }
    }

}
