
import {Routes} from '@angular/router';

const home = () => import('./home-view/home-view').then(m=>m.HomeView);

const games = () => import('./games-view/games-view').then(m=>m.GamesView);
const audios = () => import('./audios-view/audios-view').then(m=>m.AudiosView);
const arts = () => import('./arts-view/arts-view').then(m=>m.ArtsView);
const developers = () => import('./developers-view/developers-view').then(m=>m.DevelopersView);
export const marketplaceRoutes: Routes = [
  { path: 'home', loadComponent: home},
  { path: 'games', loadComponent: games},
  { path: 'audios', loadComponent: audios},
  { path: 'arts', loadComponent: arts},
  { path: 'developers', loadComponent: developers},
]


