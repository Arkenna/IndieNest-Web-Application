import { Routes } from '@angular/router';

const signUp = () =>
  import("./iam/presentation/views/sign-up-view/sign-up-view").then(m => m.SignUpView);

const logIn = () =>
  import("./iam/presentation/views/log-in-view/log-in-view").then(m => m.LogInView);

const homeView=()=>
  import("./marketplace/presentation/views/home-view/home-view").then(m => m.HomeView);

const IdProjectView=()=>import("./project/presentation/views/project-view/project-view").then(m => m.ProjectView);
const profileView = () => import("./profile/presentation/views/profile-view/profile-view").then(m => m.ProfileView);

const newProjectView = () => import("./project/presentation/views/new-project-view/new-project-view").then(m => m.NewProjectView);

const baseTitle = "Indie Nest Web Application";

export const routes: Routes = [
  {path: '', loadComponent: homeView, title: `${baseTitle} - Home`},
  {path: 'sign-up', loadComponent: signUp, title: `${baseTitle} - Sign Up`},
  {path: 'log-in', loadComponent: logIn, title: `${baseTitle} - Log In`},
  {path: 'marketplace', loadChildren: () => import('./marketplace/presentation/views/marketplace.routes').then(m=>m.marketplaceRoutes)},
  {path: 'profile/:id', loadComponent: profileView, title: `${baseTitle} - Profile`},
  {path: 'community', loadChildren: () => import('./community/presentation/views/community.routes').then(m=>m.communityRoutes)},
  {path: 'project/new/:id', loadComponent: newProjectView, title: `${baseTitle} - New Project`},
  {path: 'project/view/:type/:id', loadComponent: IdProjectView, title: `${baseTitle} - Project View`},

];
