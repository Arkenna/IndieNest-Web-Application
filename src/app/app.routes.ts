import { Routes } from '@angular/router';
import {SignUpView} from './iam/presentation/views/sign-up-view/sign-up-view';

const signUp = () =>
  import("./iam/presentation/views/sign-up-view/sign-up-view").then(m => m.SignUpView);

const logIn = () =>
  import("./iam/presentation/views/log-in-view/log-in-view").then(m => m.LogInView);

const baseTitle = "Indie Nest Web Application";

export const routes: Routes = [
  {path: 'sign-up', loadComponent: signUp, title: `${baseTitle} - Sign Up`},
  {path: 'log-in', loadComponent: logIn, title: `${baseTitle} - Log In`},
];
