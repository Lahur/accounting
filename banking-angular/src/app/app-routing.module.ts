import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RacuniComponent} from '../components/racuni/racuni.component';
import {LoginComponent} from '../components/login/login.component';
import {HomeComponent} from '../components/home/home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'racuni', component: RacuniComponent },
  { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
