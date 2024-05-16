import { Component } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent {

  blog:any;
  id:any;

  constructor(private blogService:BlogService,private route: ActivatedRoute){}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlogById(this.id).subscribe(
      (response) =>{
        console.log(response);
        this.blog = response;
      }, (error) =>{
        console.error("Error!", error);
      }
    )
    
  }

}
