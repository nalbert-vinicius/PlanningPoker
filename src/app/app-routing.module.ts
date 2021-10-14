import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterGameUrlComponent } from './enter-game-url/enter-game-url.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'room/:id', component: GameComponent},
  {path: ':id', component: EnterGameUrlComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
