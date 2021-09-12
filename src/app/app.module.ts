import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { CardSmallFiboComponent } from './card-small-fibo/card-small-fibo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    CardSmallFiboComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
