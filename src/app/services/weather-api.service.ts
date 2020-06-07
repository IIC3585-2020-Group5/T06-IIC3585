import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WeatherCard } from '../store/models/weather-card.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(private  http: HttpClient) { }

  getCityWeather(city: string): Observable<WeatherCard> {

    return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.apiKey}`)
      .pipe(
        map(data => {
          return {
            id: data.id, 
            city: data.name, 
            temperature: parseFloat((data.main.temp - 273).toFixed(2)),
            latitude: data.coord.lat,
            longitude: data.coord.lon
          }
        }
      ));
  }
}
