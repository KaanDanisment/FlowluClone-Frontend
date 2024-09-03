import { Component } from '@angular/core';
import { AuthService } from '../services/AuthService/auth.service';
import { Router } from '@angular/router';
import { UserLoginDto } from '../models/UserLoginDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  model: UserLoginDto = new UserLoginDto();
  loginForm: FormGroup;

  createLoginFrom() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
    this.createLoginFrom();
  }
  login() {
    this.model = Object.assign({}, this.loginForm.value);
    this.authService.login(this.model).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed:', err.error);
      },
    });
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
