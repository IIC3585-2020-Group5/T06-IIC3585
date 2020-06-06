import { Component, OnInit } from '@angular/core';
import { AppState } from './store/models/app-state.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeatherCard } from './store/models/weather-card.model';
import { AddCardAction } from './store/actions/weather.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'weather-app';
  constructor(private store: Store<AppState>) {};
  
  weatherCards$: Observable<Array<WeatherCard>>;

  
  ngOnInit(): void {
    this.weatherCards$ = this.store.select(store => store.weather.cardList);
  }
}
