import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate:[authGuard]},
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),canActivate:[authGuard]},
  { path: 'signup', loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent),canActivate:[authGuard]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], // Export RouterModule
})
export class AppRoutingModule {}
