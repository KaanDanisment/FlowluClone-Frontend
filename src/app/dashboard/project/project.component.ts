import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    const lastSelectedView = localStorage.getItem('selectedProjectButton');
    if (!lastSelectedView) {
      this.router.navigate(['dashboard/projects/list']);
    }
    if (lastSelectedView === 'List') {
      this.router.navigate(['dashboard/projects/list']);
    } else if (lastSelectedView === 'Archived') {
      this.router.navigate(['dashboard/projects/archived']);
    }
  }
}
