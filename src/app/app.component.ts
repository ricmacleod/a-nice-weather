import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  rainBackground = 'assets/backgrounds/rain.png';
  sunnyBackground = 'assets/background/sunny.png';
  stormBackground = 'assets/background/storm.png';
  clearBackground = 'assets/background/clear.png';
  cloudyBackground = 'assets/background/cloudy.png';
  fogBackground = 'assets/background/fog.jpg';

  dashboardBackground(currentWeather: string) {
    switch (currentWeather) {
      case 'rain':
        return this.rainBackground;
      case 'sunny':
        return this.sunnyBackground;
      case 'storm':
        return this.stormBackground;
      case 'clear':
        return this.clearBackground;
      case 'cloudy':
        return this.cloudyBackground;
      case 'fog':
        return this.fogBackground;
      default:
        return this.sunnyBackground;
    }
  }
  title = 'nice-weather-app';
}
