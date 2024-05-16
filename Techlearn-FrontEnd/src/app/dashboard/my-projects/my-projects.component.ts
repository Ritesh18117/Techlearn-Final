import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../Services/project.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterOutlet],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.css'
})
export class MyProjectsComponent {

  projects:any;

  constructor(private projectService:ProjectService,private toastr:ToastrService){}

  ngOnInit(){
    this.projectService.getAllMyProjects().subscribe(
      (response) =>{
        console.log(response);
        this.projects = response;
      }, (error) =>{
        console.error(error);
      }
    )
  }

  delete(id:any){
    this.projectService.deleteById(id).subscribe(
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
