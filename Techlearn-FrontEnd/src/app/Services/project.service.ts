import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient) { }

  getAllMyProjects(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/getAllMyProject`, {headers});
  }

  addProject(project:any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}`,project, {headers});
  }

  getAllProjects(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/getAll`);
  }

  getProjectById(Id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${Id}`);
  }

  deleteById(Id:any):Observable<any>{
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.delete<any>(`${this.baseUrl}/${Id}`, { headers });
  }

  editProjectById(id:any,project:any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.put<any>(`${this.baseUrl}/${id}`,project, {headers});
  }
}
