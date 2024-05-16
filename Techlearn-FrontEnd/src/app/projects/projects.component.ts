import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectService } from '../Services/project.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  projects:any;

  constructor(private projectService:ProjectService){}

  ngOnInit(){
    this.projectService.getAllProjects().subscribe(
      (response) =>{
        this.projects = response;
        console.log(response);
        
      }, (error) =>{
        console.error("Error",error);
        
      }
    )
  }

}
