import { Component } from '@angular/core';
import { AuthService } from '../../services/AuthService/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  userRole: string | null = null;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
  }
}
