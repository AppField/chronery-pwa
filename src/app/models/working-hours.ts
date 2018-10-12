import { Project } from './project';
import { Timestamps } from './timestamps';
import { getDateWithCurrentTime } from '../utils/utils';

export class WorkingHours extends Timestamps {
  project: Project;
  date: Date;
  from: string;
  to: string;
  comment: string;
  minutesSpent: string;

  constructor(date?: Date) {
    super();

    date = date ? date : new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    this.date = date;
    this.project = null;


    this.from = getDateWithCurrentTime().toISOString();
    this.to = '';

    this.comment = '';
  }
}
