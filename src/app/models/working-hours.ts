import { Project } from './project';
import { Timestamps } from './timestamps';
import { encodeDate, getDateWithCurrentTime } from '../utils/utils';

export class WorkingHours extends Timestamps {
  project: Project;
  date: string;
  from: string;
  to: string;
  comment: string;
  minutesSpent: string;

  constructor() {
    super();
    this.date = encodeDate(new Date());
    this.project = null;


    this.from = getDateWithCurrentTime().toISOString();
    this.to = '';

    this.comment = '';
  }
}
