import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ProjectDto } from '../../models/Dto/ProjectDto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  path = 'https://localhost:7130/api/projects';

  getProjects(): Observable<ProjectDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<ProjectDto[]>(this.path + '/getprojects', { headers })
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'An error occured' + err.error.message;
    } else {
      errorMessage = 'A Systematic Error';
    }
    return throwError(errorMessage);
  }
}
