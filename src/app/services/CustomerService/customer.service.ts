import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Customer } from '../../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customersSubject = new BehaviorSubject<Customer[]>([]);
  customers$ = this.customersSubject.asObservable();

  constructor(private http: HttpClient) {}

  path = 'https://localhost:7130/api/customers';

  getCustomers() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http
      .get<Customer[]>(this.path + '/getcustomers', { headers })
      .pipe(
        tap((customers) => this.customersSubject.next(customers)),
        catchError(this.handleError)
      )
      .subscribe();
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
