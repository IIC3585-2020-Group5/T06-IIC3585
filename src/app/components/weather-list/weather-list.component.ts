import { Component, OnInit, Input } from '@angular/core';
import { WeatherCard } from '../../store/models/weather-card.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit {

  constructor() { }

  @Input() cardList: Observable<Array<WeatherCard>>;

  ngOnInit(): void {
  }

}
