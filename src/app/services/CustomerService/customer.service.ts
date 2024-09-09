import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
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
  addCustomer(customer: Customer): Observable<Customer> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<Customer>(this.path + '/createcustomer', customer, { headers })
      .pipe(
        tap(() => {
          this.getCustomers();
        }),
        catchError(this.handleError)
      );
  }
  getCustomerById(customerId: number): Observable<Customer> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Customer>(this.path + '/getcustomer/' + customerId, {
      headers,
    });
  }
  updateCustomer(customer: Customer): Observable<Customer> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<Customer>(this.path + '/update', customer, { headers })
      .pipe(
        tap((updatedCustomer) => {
          const currentCustomer = this.customersSubject
            .getValue()
            .map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c));
          this.customersSubject.next(currentCustomer);
          this.getCustomers();
        }),
        catchError(this.handleError)
      );
  }
  deleteCustomer(customerId: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<void>(this.path + '/delete/' + customerId, {}, { headers })
      .pipe(
        tap(() => {
          const currentCustomers = this.customersSubject
            .getValue()
            .filter((c) => c.id !== customerId);
          this.customersSubject.next(currentCustomers);
        }),
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
