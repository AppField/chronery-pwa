import { Project } from './project';

export class WorkingHours {
  project: Project;
  from: string;
  to: string;
  comment: string;
  minutesSpent: string;

  constructor() {
    this.project = new Project();
    this.from = new Date().toISOString();
    this.to = '';
  }
}
