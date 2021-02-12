import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RacuniComponent} from '../components/racuni/racuni.component';
import {LoginComponent} from '../components/login/login.component';
import {HomeComponent} from '../components/home/home.component';
import {MojeStrankeComponent} from '../components/moje-stranke/moje-stranke.component';
import {StrankeComponent} from '../components/stranke/stranke.component';
import {MojiRacuniComponent} from '../components/moji-racuni/moji-racuni.component';


const routes: Routes = [
  { path: '', redirectTo: 'racuni', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'racuni', component: RacuniComponent },
  { path: 'moji-racuni', component: MojiRacuniComponent },
  { path: 'moje-stranke', component: MojeStrankeComponent},
  { path: 'stranke', component: StrankeComponent},
  { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
