
import {Routes} from '@angular/router';
const forum = () => import('./forum/forum').then(m=>m.Forum);
const newPublication = () => import('./new-publication/new-publication').then(m=>m.NewPublication);

export const communityRoutes: Routes = [
  { path: 'forum', loadComponent: forum},
  { path: 'publication/new', loadComponent: newPublication},
]


