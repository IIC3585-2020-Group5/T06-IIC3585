import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/models/app-state.model';
import { DeleteCardAction } from 'src/app/store/actions/weather.actions';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.css']
})
export class CityCardComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  @Input() city: {
    id: string,
    name: string
  };

  ngOnInit(): void {
  }

  deleteCityCard(id: string) {
    this.store.dispatch(new DeleteCardAction(id));
  }

}
