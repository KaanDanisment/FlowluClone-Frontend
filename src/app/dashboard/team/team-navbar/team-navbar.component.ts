import { Component } from '@angular/core';
import { Team } from '../../../models/team';
import { TeamService } from '../../../services/TeamService/team.service';
import { AddTeamMemberService } from '../../../services/sidebar/TeamSidebar/add-team-member.service';
import { AuthService } from '../../../services/AuthService/auth.service';

@Component({
  selector: 'app-team-navbar',
  templateUrl: './team-navbar.component.html',
  styleUrl: './team-navbar.component.css',
})
export class TeamNavbarComponent {
  team: Team;
  userRole: string | null = null;
  constructor(
    private teamService: TeamService,
    private addTeamMemberService: AddTeamMemberService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.teamService.getTeam().subscribe((team) => {
      this.team = team;
    });
    this.userRole = this.authService.getUserRole();
  }
  deleteTeam() {
    const confirmed = window.confirm('Are you sure you want to delete team?');

    if (confirmed) {
      this.teamService.deleteTeam(this.team.id).subscribe(() => {
        window.location.reload();
      });
    }
  }
  openSidebar() {
    this.addTeamMemberService.openSidebar();
  }
}
