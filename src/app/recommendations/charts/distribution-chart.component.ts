import {Component, OnChanges, Input} from '@angular/core';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {Recommendation} from './../../dtos/recommendation.dto';

@Component({
    selector: 'cs-recommendation-distribution-chart',
    template: require('./distribution-chart.component.html'),
    styles: [require('./distribution-chart.component.less')],
    directives: [CHART_DIRECTIVES]
})

export class RecommendationDistributionChartComponent implements OnChanges {

    @Input()
    recommendation: Recommendation;

    chartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    chartData: number[] = [350, 450, 100];
    chartOptions: any = {
      responsive: true,
      animation: false,
      cutoutPercentage: 75,
      legend: {
        position: 'left'
      }
    };

    chartColors: any = [
      {
        borderWidth: 5,
        borderColor: '#252830',
        backgroundColor: ['#1CA8DD', '#1BC98E', '#9F86FF', '#E4D836', '#E64759', '#aaa', '#fff']
      }
    ];

    constructor() {

    }

    ngOnChanges(changes: any): void {
      if (changes.recommendation.currentValue) {
        this.fillChart(changes.recommendation.currentValue);
      }
    }

    fillChart(rec: Recommendation) {
      this.chartLabels = [];
      this.chartData = [];

      for (let obj of rec.recommendation) {
        this.chartLabels.push(obj.ingredient.name);
        this.chartData.push(obj.resource.price_per_month);
      }
    }

}
