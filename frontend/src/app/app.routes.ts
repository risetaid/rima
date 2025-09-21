import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/patients', pathMatch: 'full' },
  {
    path: 'patients',
    loadComponent: () => import('./pages/patients/patients.component').then(m => m.PatientsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'reminders',
    loadComponent: () => import('./pages/reminders/reminders.component').then(m => m.RemindersComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'content',
    loadComponent: () => import('./pages/content/content.component').then(m => m.ContentComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Developer'] },
  },
  {
    path: 'pending-user',
    loadComponent: () => import('./pages/pending-user/pending-user.component').then(m => m.PendingUserComponent),
    canActivate: [AuthGuard],
  },
];
