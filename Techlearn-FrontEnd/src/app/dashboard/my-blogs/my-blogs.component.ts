import { Component } from '@angular/core';
import { BlogService } from '../../Services/blog.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-my-blogs',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterOutlet],
  templateUrl: './my-blogs.component.html',
  styleUrl: './my-blogs.component.css'
})
export class MyBlogsComponent {
  
  blogs:any;

  constructor(private blogService:BlogService,private toastr:ToastrService){}

  ngOnInit(){
    this.blogService.getAllMyBlogs().subscribe(
      (response) =>{
        console.log(response);
        this.blogs = response;
      }, (error) =>{
        console.error(error);
      }
    )
  }

  delete(id:any){
    this.blogService.deleteById(id).subscribe(
      (response) =>{
        console.log(response);
        this.toastr.error("Deleted Successfully");
        this.ngOnInit()
      }, (error) =>{
        console.error("Error!",error);
      }
    )
  }

}
