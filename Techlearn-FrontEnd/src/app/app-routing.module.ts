import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { authGuard } from './auth.guard';
import { BlogsComponent } from './blogs/blogs.component';
import { ProjectsComponent } from './projects/projects.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
  { path: 'blog/edit/:id', component: EditBlogComponent,canActivate:[authGuard] },
  { path: 'project/edit/:id', component: EditProjectComponent,canActivate:[authGuard] },
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
