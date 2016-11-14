import {Component, OnChanges, Input} from '@angular/core';
import {Recommendation} from './../../api/dtos/recommendation.dto';

@Component({
    selector: 'cs-recommendation-sensitivity-chart',
    template: require('./sensitivity-chart.component.html'),
    styles: [require('./sensitivity-chart.component.less')]
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
          },
          gridLines: {
            color: '#6f7890'
          }
      }]
    }
  };

  constructor() {
    Chart.defaults.global.defaultFontColor = '#6f7890';
    Chart.defaults.global.defaultFontSize = 14;
  }

  ngOnChanges(changes: any): void {
    if (changes.recommendations.currentValue) {
      this.fillChart(changes.recommendations.currentValue);
      console.log(changes.recommendations.currentValue.length);
    }
  }

  fillChart(recommendationArray: Recommendation[]) {

    let array = recommendationArray.slice(0).filter((obj) => { return obj.status === 'satisfiable'; }); // clone array to prevent sorting issues
    array.sort((a, b) => { return a.num_simultaneous_users >= b.num_simultaneous_users ? 1 : -1; });

    if (array.length > 0) {
      this.chartLabels = [];
      this.chartData = [];
    } else {
      return;
    }

    let providers = array.map((obj) => {
      return obj.recommendation[0].resource.provider;
    });

    providers = providers.filter((v, i) => { return providers.indexOf(v) === i; });

    for (let recommendation of array) {
      this.chartLabels.push(recommendation.num_simultaneous_users);

      let providerName = recommendation.recommendation[0].resource.provider;
      let regionName = recommendation.recommendation[0].resource.region_area;

      let data = this.chartData.filter((obj) => obj.label === providerName + ' [' + regionName + ']');

      if (data.length === 0) {
        let newProvider = {
          data: [],
          label: providerName + ' [' + regionName + ']',
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
