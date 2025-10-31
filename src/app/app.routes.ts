import { Routes } from '@angular/router';
import {SignUpView} from './iam/presentation/views/sign-up-view/sign-up-view';

const signUp = () =>
  import("./iam/presentation/views/sign-up-view/sign-up-view").then(m => m.SignUpView);

const logIn = () =>
  import("./iam/presentation/views/log-in-view/log-in-view").then(m => m.LogInView);

const homeView=()=>
  import("./marketplace/presentation/views/home-view/home-view").then(m => m.HomeView);

const artsView = () =>
  import("./marketplace/presentation/views/arts-view/arts-view").then(m => m.ArtsView);

const audiosView = () =>
  import("./marketplace/presentation/views/audios-view/audios-view").then(m => m.AudiosView);

const developersView = () =>
  import("./marketplace/presentation/views/developers-view/developers-view").then(m => m.DevelopersView);

const gamesView = () =>
  import("./marketplace/presentation/views/games-view/games-view").then(m => m.GamesView);

const profileView = () => import("./profile/presentation/views/profile-view/profile-view").then(m => m.ProfileView);

const forum = () => import("./community/presentation/views/forum/forum").then(m => m.Forum);

const baseTitle = "Indie Nest Web Application";

export const routes: Routes = [
  {path: '', loadComponent: homeView, title: `${baseTitle} - Home`},
  {path: 'sign-up', loadComponent: signUp, title: `${baseTitle} - Sign Up`},
  {path: 'log-in', loadComponent: logIn, title: `${baseTitle} - Log In`},
  {path: 'home', loadComponent: homeView, title: `${baseTitle} - Home`},
  {path: 'profile/:id', loadComponent: profileView, title: `${baseTitle} - Profile`},
  {path: 'community', loadChildren: () => import('./community/presentation/views/community.routes').then(m=>m.communityRoutes)},


  { path: 'arts', loadComponent: artsView, title: `${baseTitle} - Arts` },
  { path: 'audios', loadComponent: audiosView, title: `${baseTitle} - Audios` },
  { path: 'developers', loadComponent: developersView, title: `${baseTitle} - Developers` },
  { path: 'games', loadComponent: gamesView, title: `${baseTitle} - Games` },

];
