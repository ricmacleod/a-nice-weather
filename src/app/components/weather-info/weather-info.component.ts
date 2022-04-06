import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  ILocationResult,
  IWeatherResult,
} from 'src/app/interfaces/services.interfaces';
import { GetWeatherService } from 'src/app/services/get-weather.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css'],
})
export class WeatherInfoComponent implements OnInit {
  @Output() public weatherResult = new EventEmitter<string>();

  constructor(private _weatherService: GetWeatherService) {}

  // Dummy info from example, need to remove, if this shows something broke
  public dashboardData = {
    currentTemp: "LOADING",
    units: 'f',
    location: 'LOADING',
    condition: 'LOADING',
    maxTemp: "LOADING",
    minTemp: "LOADING",
  };

  locationToSearch= "";

  weatherDashboard: any;
  isWeatherLoaded = false;

  setDashboardWeather(weather: IWeatherResult) {
    this.dashboardData.currentTemp = parseFloat(
      (weather.main.temp - 273.15).toFixed(1)
    ).toString();
    // Need to move this so that F/C can be selected
    this.dashboardData.units = 'c';
    this.dashboardData.location = weather.name + ', ' + weather.sys.country;
    // Not sure why this comes back as an array
    this.dashboardData.condition = weather.weather[0].description.replace(
      /^\w/,
      (c) => c.toUpperCase()
    );
    console.log('sending this condition ***', this.dashboardData.condition)
    this.weatherResult.emit(this.dashboardData.condition)
    // Harcoded Celsius for now
    this.dashboardData.maxTemp = parseFloat(
      (weather.main.temp_max - 273.15).toFixed(1)
    ).toString();
    this.dashboardData.minTemp = parseFloat(
      (weather.main.temp_min - 273.15).toFixed(1)
    ).toString();
    console.log('Dashboard data change =====', this.dashboardData);
  }

  async loadWeatherInfo() {
    let locations: ILocationResult[];
    let weather: IWeatherResult;
    try {
      this._weatherService
        .getLocation({
          cityName: 'Monterrey',
          stateCode: '',
          countryCode: 'MEX',
        })
        .subscribe((locationData) => {
          // Using only the first value for now
          locations = locationData;
          console.log('got this location >>>>>', locationData);
          this._weatherService
            .getWeather(locations[0].lat, locations[0].lon)
            .subscribe((weatherData) => {
              weather = weatherData;
              this.setDashboardWeather(weather);
            });
        });
      return true;
    } catch (error) {
      console.log('Error on loading dashboard weather ....', error);
      return false;
    }
  }

  ngOnInit(): void {
    this.loadWeatherInfo().then((loadWeatherComplete) => {
      if (loadWeatherComplete) {
        console.log('got here  ^^^^ current:::',this.isWeatherLoaded);
        this.isWeatherLoaded = loadWeatherComplete;
        console.log('got here  ^^^^ changed:::',this.isWeatherLoaded);
      }
    });
  }
}
