import { Component, OnInit, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Store, createSelector, select } from '@ngrx/store';
import { AppState } from 'src/app/store/models/app-state.model';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ForecastElement } from '../../store/models/weather-card.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-forecast-chart',
  templateUrl: './forecast-chart.component.html',
  styleUrls: ['./forecast-chart.component.css']
})
// export class ForecastChartComponent {
//   constructor(public dialog: MatDialog) {}

//   openDialog() {
//     const dialogRef = this.dialog.open(ForecastChartDialog);

//     dialogRef.afterClosed().subscribe(result => {
//       // console.log(`Dialog result: ${result}`);
//     });
//   }
// }

export class ForecastChartComponent  implements OnInit, OnChanges  {
  public forecastData$;
  public lineChartData: ChartDataSets[];

  public lineChartLabels: Label[];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,176,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  public forecastSelector = (store) => store.weather.currentForecast;

  constructor(private store: Store<AppState>) { };


  ngOnChanges(changes): void {

  }
  

  ngOnInit(): void {
    this.forecastData$ = this.store.select(this.forecastSelector);

    let tempList: number[] = [];
    let windList: number[] = [];
    let dates: Label[];
    this.lineChartData = null;
    // console.log(this.lineChartData);

    this.forecastData$.subscribe((data) => {
      if (data && data.forecast.length > 0) {
        tempList = data.forecast.map(x => x.main_temp);
        windList = data.forecast.map(x => x.wind_speed);
        dates = data.forecast.map(x => x.dt);
        // console.log(dates);
        let tempData: ChartDataSets = {data: tempList, label: 'Temperature' };
        let windData: ChartDataSets = {data: windList, label: 'Wind Speed' };
        this.lineChartData = [tempData, windData];
        this.lineChartLabels = dates;
      } else {
        this.lineChartData = null;
      }
    });
    

    // let windList: number[] = this.forecastData$.pipe(
    //   select("forecast")).subscribe(
    //     element
    //   )
      // map(x => x.wind_speed));
    // let dates: Label[] = this.forecastData$.pipe(map(x => x.dt));
    // let tempData: ChartDataSets = {data:tempList, label: 'Temperature' };
    // let windData: ChartDataSets = {data:windList, label: 'Wind Speed' };
    // this.lineChartData = [tempData, windData];
    // this.lineChartLabels = dates;
  }

}


// @Component({
//   selector: 'app-forecast-chart-dialog',
//   templateUrl: './forecast-chart-dialog.html',
// })

// export class ForecastChartDialog  implements OnInit, OnChanges  {
//   public forecastData$;
//   public lineChartData: ChartDataSets[];

//   public lineChartLabels: Label[];
//   public lineChartOptions: (ChartOptions & { annotation: any }) = {
//     responsive: true,
//     scales: {
//       // We use this empty structure as a placeholder for dynamic theming.
//       xAxes: [{}],
//       yAxes: [
//         {
//           id: 'y-axis-0',
//           position: 'left',
//         },
//         {
//           id: 'y-axis-1',
//           position: 'right',
//           gridLines: {
//             color: 'rgba(255,0,0,0.3)',
//           },
//           ticks: {
//             fontColor: 'red',
//           }
//         }
//       ]
//     },
//     annotation: {
//       annotations: [
//         {
//           type: 'line',
//           mode: 'vertical',
//           scaleID: 'x-axis-0',
//           value: 'March',
//           borderColor: 'orange',
//           borderWidth: 2,
//           label: {
//             enabled: true,
//             fontColor: 'orange',
//             content: 'LineAnno'
//           }
//         },
//       ],
//     },
//   };
//   public lineChartColors: Color[] = [
//     { // grey
//       backgroundColor: 'rgba(148,159,177,0.2)',
//       borderColor: 'rgba(148,159,176,1)',
//       pointBackgroundColor: 'rgba(148,159,177,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(148,159,177,0.8)'
//     },
//     { // dark grey
//       backgroundColor: 'rgba(77,83,96,0.2)',
//       borderColor: 'rgba(77,83,96,1)',
//       pointBackgroundColor: 'rgba(77,83,96,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(77,83,96,1)'
//     },
//     { // red
//       backgroundColor: 'rgba(255,0,0,0.3)',
//       borderColor: 'red',
//       pointBackgroundColor: 'rgba(148,159,177,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(148,159,177,0.8)'
//     }
//   ];
//   public lineChartLegend = true;
//   public lineChartType = 'line';

//   public forecastSelector = (store) => store.weather.currentForecast;

//   constructor(private store: Store<AppState>) { };


//   ngOnChanges(changes): void {

//   }
  

//   ngOnInit(): void {
//     this.forecastData$ = this.store.select(this.forecastSelector);

//     let tempList: number[] = [];
//     let windList: number[] = [];
//     let dates: Label[];
//     this.lineChartData = null;
//     console.log(this.lineChartData);

//     this.forecastData$.subscribe((data) => {
//       if (data && data.forecast.length > 0) {
//         tempList = data.forecast.map(x => x.main_temp);
//         windList = data.forecast.map(x => x.wind_speed);
//         dates = data.forecast.map(x => x.dt);
//         console.log(dates);
//         let tempData: ChartDataSets = {data: tempList, label: 'Temperature' };
//         let windData: ChartDataSets = {data: windList, label: 'Wind Speed' };
//         this.lineChartData = [tempData, windData];
//         this.lineChartLabels = dates;
//       } else {
//         this.lineChartData = null;
//       }
//     });
    

//     // let windList: number[] = this.forecastData$.pipe(
//     //   select("forecast")).subscribe(
//     //     element
//     //   )
//       // map(x => x.wind_speed));
//     // let dates: Label[] = this.forecastData$.pipe(map(x => x.dt));
//     // let tempData: ChartDataSets = {data:tempList, label: 'Temperature' };
//     // let windData: ChartDataSets = {data:windList, label: 'Wind Speed' };
//     // this.lineChartData = [tempData, windData];
//     // this.lineChartLabels = dates;
//   }

// }