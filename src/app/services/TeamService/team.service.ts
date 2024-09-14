import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../../models/team';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { TeamMember } from '../../models/TeamMember';
import { TeamMemberDto } from '../../models/Dto/TeamMemberDto';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamMemberSubject = new BehaviorSubject<TeamMemberDto[]>([]);
  teamMember$ = this.teamMemberSubject.asObservable();
  constructor(private http: HttpClient) {}

  path = 'https://localhost:7130/api/teams';

  getTeam(): Observable<Team> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<Team>(this.path + '/getteam', { headers })
      .pipe(catchError(this.handleError));
  }
  createTeam() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post(this.path + '/createteam', {}, { headers })
      .pipe(catchError(this.handleError));
  }
  addMemberToTeam(teamMember: TeamMember): Observable<TeamMember> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<TeamMember>(this.path + '/addmember', teamMember, { headers })
      .pipe(
        tap(() => {
          this.getTeamMember();
        }),
        catchError(this.handleError)
      );
  }
  getTeamMember() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<TeamMemberDto[]>(this.path + '/getteammembers', { headers })
      .pipe(
        tap((teamMembers) => this.teamMemberSubject.next(teamMembers)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  deleteTeam(teamId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post(this.path + '/deleteteam/' + teamId, {}, { headers })
      .pipe(catchError(this.handleError));
  }

  removeMember(email: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post(this.path + '/removemember/' + email, {}, { headers })
      .pipe(
        tap(() => {
          this.getTeamMember();
        }),
        catchError(this.handleError)
      );
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'An error occurred: ' + err.error.message;
    } else {
      errorMessage = err.error;
    }
    return throwError(errorMessage);
  }
}
