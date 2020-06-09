import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/models/app-state.model';
import { DeleteCardAction, AddForecastAction } from 'src/app/store/actions/weather.actions';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ForecastChartComponent } from "src/app/components/forecast-chart/forecast-chart.component";

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.css']
})
export class CityCardComponent implements OnInit {

  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  @Input() city: { 
    id: string,
    name: string,
    temp: number,
  };

  ngOnInit(): void {
  }

  deleteCityCard(id: string) {
    this.store.dispatch(new DeleteCardAction(id));
  }

  getCityForecast(city: string) {
    this.store.dispatch(new AddForecastAction(city));
    const dialogRef = this.dialog.open(ForecastChartComponent);
  }

    openDialog() {
    const dialogRef = this.dialog.open(ForecastChartComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }
}
