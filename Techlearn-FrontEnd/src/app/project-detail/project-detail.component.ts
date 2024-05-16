import { Component } from '@angular/core';
import { ProjectService } from '../Services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent {
  project:any;
  id:any;

  constructor(private projectService:ProjectService,private route: ActivatedRoute){}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProjectById(this.id).subscribe(
      (response) =>{
        console.log(response);
        this.project = response;
      }, (error) =>{
        console.error("Error!", error);
      }
    )
    
  }
}
