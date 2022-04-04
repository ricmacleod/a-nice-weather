import { Component, OnInit } from '@angular/core';
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
  constructor(private weatherService: GetWeatherService) {}

  // Dummy info from example, need to remove
  dashboardData = {
    currentTemp: 73.4,
    units: 'f',
    location: 'Manila, Philippines',
    condition: 'Partly cloudy',
    maxTemp: 85.1,
    minTemp: 72.5,
  };

  weatherDashboard: any;
  isWeatherLoaded = false;

  setDashboardWeather(weather: IWeatherResult) {
    this.dashboardData.currentTemp = parseFloat(
      (weather.main.temp - 273.15).toFixed(1)
    );
    // Need to move this so that F/C can be selected
    this.dashboardData.units = 'c';
    this.dashboardData.location = weather.name + ', ' + weather.sys.country;
    // Not sure why this comes back as an array
    this.dashboardData.condition = weather.weather[0].description.replace(
      /^\w/,
      (c) => c.toUpperCase()
    );
    // Harcoded Celsius for now
    this.dashboardData.maxTemp = parseFloat(
      (weather.main.temp_max - 273.15).toFixed(1)
    );
    this.dashboardData.minTemp = parseFloat(
      (weather.main.temp_min - 273.15).toFixed(1)
    );
    console.log('Dashboard data change =====', this.dashboardData);
  }

  async loadWeatherInfo() {
    let location: ILocationResult;
    let weather: IWeatherResult;
    try {
      location = await this.weatherService.getLocation('Monterrey', '', 'MEX');
      weather = (await this.weatherService.getWeather(
        location.lat,
        location.lon
      )) as IWeatherResult;
      console.log('setting to this  +++', weather);
      this.setDashboardWeather(weather);
      return true;
    } catch (error) {
      console.log('Error on loading dashboard weather ....', error);
      return false;
    }
  }

  ngOnInit(): void {
    this.loadWeatherInfo().then((loadWeatherComplete) => {
      if (loadWeatherComplete) {
        this.isWeatherLoaded = loadWeatherComplete;
      }
    });
  }
}
