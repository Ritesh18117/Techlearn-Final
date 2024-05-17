import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private baseUrl = 'https://techlearn-backend.vercel.app/api/blogs';

  constructor(private http: HttpClient) { }

  getAllMyBlogs(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/getAllMyBlog`, {headers});
  }

  addBlog(blog:any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}`,blog, {headers})
  } 

  getAllBlog():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/getAll`);
  }

  getBlogById(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  deleteById(Id:any):Observable<any>{
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.delete<any>(`${this.baseUrl}/${Id}`, { headers });
  }

  editBlogById(id:any,blog:any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.put<any>(`${this.baseUrl}/${id}`,blog, {headers})
  } 
}
