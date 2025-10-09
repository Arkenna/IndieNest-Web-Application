// en landing-routing.module.ts
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './presentation/home/index';
import { AboutComponent } from './presentation/about/about';
import { GoalsComponent } from './presentation/goals/goals';
import { ContactComponent } from './presentation/contact/contact';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'goals', component: GoalsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' } // Redirige por defecto a home
];


export class LandingRoutingModule { }
