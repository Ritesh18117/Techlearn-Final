import { Component } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { AddProjectComponent } from './add-project/add-project.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,ProfileComponent,MyBlogsComponent,MyProjectsComponent,AddBlogComponent,AddProjectComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  myBlogs:boolean = false;
  myProjects:boolean = false;
  profile:boolean = true;
  addBlog:boolean = false;
  addProject:boolean = false;

  profileMethod(){
    this.profile = true;
    this.myBlogs = false;
    this.myProjects = false;
    this.addBlog = false;
    this.addProject = false;
  }

  myBlogsMethod(){
    this.myBlogs = true;
    this.profile = false;
    this.myProjects = false;
    this.addBlog = false;
    this.addProject = false;
  }

  myProjectsMethod(){
    this.myProjects = true;
    this.myBlogs = false;
    this.profile = false;
    this.addBlog = false;
    this.addProject = false;
  }

  addBlogMethod(){
    this.addBlog = true;
    this.myProjects = false;
    this.myBlogs = false;
    this.profile = false;
    this.addProject = false;
  }

  addProjectMethod(){
    this.addProject = true;
    this.addBlog = false;
    this.myProjects = false;
    this.myBlogs = false;
    this.profile = false;
  }
}
