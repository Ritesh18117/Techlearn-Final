import { Component } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css'
})
export class EditBlogComponent {
  textForm!: FormGroup;
  id:any;

  constructor(private blogService:BlogService,private toastr:ToastrService,private formBuilder: FormBuilder,private route: ActivatedRoute){
    this.textForm = this.formBuilder.group({
      title: [''],
      image: [''],
      content: ['']
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlogById(this.id).subscribe(
      (response) => {
        console.log(response);
        this.textForm.patchValue(response);
      }, (error) => {
        console.error("Error!", error);
      }
    )
  }

  onSubmit() {
    this.blogService.editBlogById(this.id, this.textForm.value).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success("Project Edited Successfully");
        this.ngOnInit();
      }, (error) => {
        console.error("Error", error);
        this.toastr.error("Error Editing Project");
      }
    )
  }
}
