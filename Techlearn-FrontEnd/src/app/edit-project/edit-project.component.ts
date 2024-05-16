import { Component } from '@angular/core';
import { ProjectService } from '../Services/project.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent {

  projectForm: FormGroup;
  id: any;

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.projectForm = this.formBuilder.group({
      name: [''],
      image: [''],
      description: [''],
      code: ['']
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProjectById(this.id).subscribe(
      (response) => {
        console.log(response);
        this.projectForm.patchValue(response);
      }, (error) => {
        console.error("Error!", error);
      }
    )
  }

  onSubmit() {
    this.projectService.editProjectById(this.id, this.projectForm.value).subscribe(
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
