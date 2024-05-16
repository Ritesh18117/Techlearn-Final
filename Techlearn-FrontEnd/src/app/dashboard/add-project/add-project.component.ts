import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../Services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projectForm!: FormGroup;
  // submittedData = {
  //   image: '',
  //   description: '',
  //   code: '',
  //   name:'',
  // };

  constructor(private projectService:ProjectService, private toastr:ToastrService){}

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      image: new FormControl(''),
      description: new FormControl(''),
      code: new FormControl(''),
      name:new FormControl(''),
    });
  }

  onSubmit() {
    // this.submittedData = this.projectForm.value;
    // console.log('Project Data:', this.projectForm.value);
    this.projectService.addProject(this.projectForm.value).subscribe(
      (response) =>{
        console.log(response);
        this.toastr.success("Project Added Successfully");
        this.ngOnInit();
      }, (error) =>{
        console.error("Error",error);
        this.toastr.error("Project Adding Error");
      }
    )
  }
}
