import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/models/app-state.model';
import { AddCardAction } from 'src/app/store/actions/weather.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  city$: string = "";
  errorMessage$;

  getCityWeather(city: string) {
    this.store.dispatch(new AddCardAction(city));
    this.city$ = "";
  }

  ngOnInit(): void {
    this.errorMessage$ = this.store.select(store => store.weather.error);

    console.log(`Error: ${this.errorMessage$}`);
  }

}
