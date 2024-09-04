import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ProjectDto } from '../../models/Dto/ProjectDto';
import { Project } from '../../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectsSubject = new BehaviorSubject<ProjectDto[]>([]);
  projects$ = this.projectsSubject.asObservable();

  constructor(private http: HttpClient) {}

  path = 'https://localhost:7130/api/projects';

  getProjects() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http
      .get<ProjectDto[]>(this.path + '/getprojects', { headers })
      .pipe(
        tap((projects) => this.projectsSubject.next(projects)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  addProject(project: Project): Observable<ProjectDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<ProjectDto>(this.path + '/createproject', project, {
        headers,
      })
      .pipe(
        tap(() => {
          this.getProjects();
        }),
        catchError(this.handleError)
      );
  }
  deleteProject(projectId: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<void>(this.path + '/delete/' + projectId, {}, { headers })
      .pipe(
        tap(() => {
          const currentProjects = this.projectsSubject
            .getValue()
            .filter((p) => p.id !== projectId);
          this.projectsSubject.next(currentProjects);
        }),
        catchError(this.handleError)
      );
  }
  updateProject(project: Project): Observable<ProjectDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<ProjectDto>(this.path + '/update', project, { headers })
      .pipe(
        tap((updatedProject) => {
          const currentProjects = this.projectsSubject
            .getValue()
            .map((p) => (p.id === updatedProject.id ? updatedProject : p));
          this.projectsSubject.next(currentProjects);
          this.getProjects();
        }),
        catchError(this.handleError)
      );
  }
  getProjectById(projectId: number): Observable<ProjectDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ProjectDto>(this.path + '/getproject/' + projectId, {
      headers,
    });
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'An error occured' + err.error.message;
    } else {
      errorMessage = err.error;
    }
    return throwError(errorMessage);
  }
}
