export class TaskDto {
  id: number;
  name: string;
  description: string;
  status: string;
  projectId: number;
  projectName: string;
  startDate: Date;
  endDate: Date;
  userId: number;
}
