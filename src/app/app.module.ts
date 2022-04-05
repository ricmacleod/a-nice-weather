import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherInfoComponent } from './components/weather-info/weather-info.component';
import { HttpClientModule } from '@angular/common/http';
import { GetWeatherService } from './services/get-weather.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [GetWeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
