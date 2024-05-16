import { Component } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {

  blogs:any;

  constructor(private blogService:BlogService){}

  ngOnInit(){
    this.blogService.getAllBlog().subscribe(
      (response) =>{
        console.log(response);
        this.blogs = response;
      }, (error) =>{
        console.error("Error!!", error);
      }
    )
  }
}
