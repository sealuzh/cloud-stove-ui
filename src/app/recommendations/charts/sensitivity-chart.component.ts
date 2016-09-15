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

  chartLabels: number[];
  chartData: any[] = [];

  chartOptions: any = {
    responsive: true,
    animation: false,
    cutoutPercentage: 75,
    legend: {
      position: 'top'
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: '$/month'
        }
      }],
      xAxes: [{
          type: 'linear',
          position: 'bottom',
          scaleLabel: {
            display: true,
            labelString: 'Users'
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

    if (recommendationArray.length > 0) {
      this.chartLabels = [];
      this.chartData = [];
    }

    let array = recommendationArray.slice(0).filter((obj) => { return obj.status === 'satisfiable'; }); // clone array to prevent sorting issues
    array.sort((a, b) => { return a.num_simultaneous_users >= b.num_simultaneous_users ? 1 : -1; });

    let providers = array.map((obj) => {
      return obj.recommendation[0].resource.provider;
    });

    providers = providers.filter((v,i) => { return providers.indexOf(v) === i; });

    for (let recommendation of array) {
      this.chartLabels.push(recommendation.num_simultaneous_users);

      let providerName = recommendation.recommendation[0].resource.provider;
      let data = this.chartData.filter((obj) => obj.label === providerName);

      if (data.length === 0) {
        let newProvider = {
          data: [],
          label: providerName,
          backgroundColor: '#1CA8DD',
          borderWidth: 0,
          pointBackgroundColor: '#1CA8DD',
          pointBorderColor: '#1CA8DD',
          pointBorderWidth: 1,
          lineTension: 0,
          fill: false
        };
        newProvider.data.push({x: recommendation.num_simultaneous_users, y: recommendation.vm_cost});
        this.chartData.push(newProvider);
      } else if (data.length > 0) {
        data[0].data.push({x: recommendation.num_simultaneous_users, y: recommendation.vm_cost});
      }

    }
  }

}
