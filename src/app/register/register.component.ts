import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserRegisterDto } from '../models/UserRegisterDto';
import { AuthService } from '../services/AuthService/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  registerForm: FormGroup;
  model: UserRegisterDto = new UserRegisterDto();

  createUserRegisterFrom() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.createUserRegisterFrom();
  }
  register() {
    this.model = Object.assign({}, this.registerForm.value);
    this.authService.register(this.model).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
        alert(err.error);
      },
    });
  }
}
