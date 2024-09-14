import { Component } from '@angular/core';
import { TeamService } from '../../../services/TeamService/team.service';
import { TeamMemberDto } from '../../../models/Dto/TeamMemberDto';
import { Team } from '../../../models/team';
import { AuthService } from '../../../services/AuthService/auth.service';

@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrl: './team-member-list.component.css',
})
export class TeamMemberListComponent {
  team: Team;
  teamMembers: TeamMemberDto[] = [];
  selectedMember: TeamMemberDto = null;
  selectMember(member: TeamMemberDto) {
    if (this.selectedMember === member) {
      this.selectedMember = null;
    } else {
      this.selectedMember = member;
    }
  }
  searchTerm: string = '';
  filteredMembers: TeamMemberDto[] = [];
  userRole: string | null = null;
  constructor(
    private teamService: TeamService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.teamService.getTeam().subscribe((team) => {
      this.team = team;
      if (this.team) {
        this.loadTeamMembers();
      }
    });
    this.userRole = this.authService.getUserRole();
  }

  loadTeamMembers(): void {
    this.teamService.getTeamMember();
    this.teamService.teamMember$.subscribe((teamMembers) => {
      this.teamMembers = teamMembers;
      this.filterMember();
    });
  }
  filterMember() {
    const term = this.searchTerm.toLowerCase();
    this.filteredMembers = this.teamMembers.filter((member) =>
      member.firstName.toLowerCase().includes(term)
    );
  }
  removeMember() {
    this.teamService.removeMember(this.selectedMember.email).subscribe(() => {
      this.selectedMember = null;
    });
  }

  createTeam() {
    this.teamService.createTeam().subscribe(() => {
      window.location.reload();
    });
  }
}
