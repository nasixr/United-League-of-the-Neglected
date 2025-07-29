import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'member/:id',
    loadComponent: () => import('./components/member/member.component').then(m => m.MemberComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];