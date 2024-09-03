import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Task } from '../../models/task';
import { TaskDto } from '../../models/Dto/TaskDto';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<TaskDto[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {}

  private path = 'https://localhost:7130/api/tasks';

  // Görevleri Getir
  getTasks(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<TaskDto[]>(this.path + '/gettasks', { headers })
      .pipe(
        tap((tasks) => this.tasksSubject.next(tasks)),
        catchError(this.handleError)
      )
      .subscribe();
  }

  getTaskById(taskId: number): Observable<TaskDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<TaskDto>(this.path + '/gettask/' + taskId, {
      headers,
    });
  }

  addTask(task: Task): Observable<TaskDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post<TaskDto>(this.path + '/createtask', task, { headers })
      .pipe(
        tap((newTask) => {
          this.getTasks();
        }),
        catchError(this.handleError)
      );
  }

  updateTask(task: Task): Observable<TaskDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post<TaskDto>(this.path + '/update', task, { headers })
      .pipe(
        tap((updatedTask) => {
          const currentTasks = this.tasksSubject
            .getValue()
            .map((t) => (t.id === updatedTask.id ? updatedTask : t));
          this.tasksSubject.next(currentTasks);
          this.getTasks();
        }),
        catchError(this.handleError)
      );
  }

  deleteTask(taskId: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post<void>(this.path + '/delete/' + taskId, {}, { headers })
      .pipe(
        tap(() => {
          const currentTasks = this.tasksSubject
            .getValue()
            .filter((t) => t.id !== taskId);
          this.tasksSubject.next(currentTasks);
        }),
        catchError(this.handleError)
      );
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'An error occurred: ' + err.error.message;
    } else {
      errorMessage = 'A systematic error occurred';
    }
    return throwError(errorMessage);
  }
}
