import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../../Services/blog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent{

  textForm!: FormGroup;
  // submittedContent: string = '';
  // submittedImageUrl: string = '';
  // submittedTitle: string = '';

  constructor(private blogService:BlogService,private toastr:ToastrService){}

  ngOnInit() {
    this.textForm = new FormGroup({
      image: new FormControl(''), // Assuming you want to capture the image URL as well
      content: new FormControl(''),
      title: new FormControl('')
    });
  }

  onSubmit() {
    // this.submittedContent = this.textForm.value.content;
    // this.submittedImageUrl = this.textForm.value.image;
    // this.submittedTitle = this.textForm.value.title;
    // console.log('Form Data:', this.textForm.value);
    this.blogService.addBlog(this.textForm.value).subscribe(
      (response) =>{
        console.log(response);
        this.toastr.success("Blog Added Successfully");
        this.ngOnInit();
      }, (error) =>{
        console.error(error);
        this.toastr.success("Project Adding Error");
      }
    )
  }
}
