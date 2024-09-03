import { Injectable } from '@angular/core';
declare let alertify: any;
@Injectable({
  providedIn: 'root',
})
export class AlertifyjsService {
  constructor() {}
  success(message: string) {
    alertify.success(message);
  }
}
