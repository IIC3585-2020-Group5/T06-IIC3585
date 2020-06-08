import { Component, OnInit } from '@angular/core';
import { AppState } from './store/models/app-state.model';
import { Store, createSelector } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { WeatherCard } from './store/models/weather-card.model';
import { AddCardAction } from './store/actions/weather.actions';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'weather-app';
  constructor(private store: Store<AppState>) {};
  
  weatherCards$: Observable<Array<WeatherCard>>;
  latitude$;
  longitude$;
  city$;

  selectWeatherCards = (store: AppState) => store.weather.cardList
  selectCurrentCity = createSelector(
    this.selectWeatherCards,
    (weatherCards: WeatherCard[]) => {
      if (weatherCards.length) {
        return weatherCards[weatherCards.length - 1].city;
      }
      return "";
    }

  ) 


  ngOnInit(): void {
    this.weatherCards$ = this.store.select(this.selectWeatherCards);
    this.latitude$ = this.store.select(store => store.weather.mapLatitude);
    this.longitude$ = this.store.select(store => store.weather.mapLongitude);
    this.city$ = this.store.select(this.selectCurrentCity);
  }
}
