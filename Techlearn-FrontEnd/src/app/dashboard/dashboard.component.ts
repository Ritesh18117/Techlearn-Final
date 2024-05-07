import { Component } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,ProfileComponent,MyBlogsComponent,MyProjectsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  myBlogs:boolean = false;
  myProjects:boolean = false;
  profile:boolean = true;

  profileMethod(){
    this.profile = true;
    this.myBlogs = false;
    this.myProjects = false;
  }

  myBlogsMethod(){
    this.myBlogs = true;
    this.profile = false;
    this.myProjects = false;
  }

  myProjectsMethod(){
    this.myProjects = true;
    this.myBlogs = false;
    this.profile = false;
  }
}
