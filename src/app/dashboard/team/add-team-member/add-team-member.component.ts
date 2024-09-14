import { Component } from '@angular/core';
import { AddTeamMemberService } from '../../../services/sidebar/TeamSidebar/add-team-member.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamMember } from '../../../models/TeamMember';
import { TeamService } from '../../../services/TeamService/team.service';
import { AlertifyjsService } from '../../../services/AlertifyJsService/alertifyjs.service';

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrl: './add-team-member.component.css',
})
export class AddTeamMemberComponent {
  isOpen = false;
  team: any;
  constructor(
    private addTeamMemberService: AddTeamMemberService,
    private teamService: TeamService,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder
  ) {}

  model: TeamMember = new TeamMember();
  memberForm: FormGroup;

  createMemberForm() {
    this.memberForm = this.formBuilder.group({
      UserEmail: ['', Validators.required],
      Role: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.addTeamMemberService.sidebarOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
    this.teamService.getTeam().subscribe((team) => {
      this.team = team;
    });
    this.createMemberForm();
  }

  addMember() {
    if (this.memberForm.valid) {
      this.model = Object.assign({}, this.memberForm.value);
      this.model.TeamId = this.team.id;
    }
    this.teamService.addMemberToTeam(this.model).subscribe(
      () => {
        this.closeSidebar();
        this.alertifyService.success('User added to Team');
      },
      (error) => {
        alert(error.message);
        console.log(error);
      }
    );
  }

  closeSidebar() {
    this.addTeamMemberService.closeSidebar();
  }
}
