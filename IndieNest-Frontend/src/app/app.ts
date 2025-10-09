import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingRoutingModule}  from './features/landing/landing-routing.module';

@Component({
  selector: 'app-root',
  imports: [LandingRoutingModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('IndieNest-Frontend');
}
