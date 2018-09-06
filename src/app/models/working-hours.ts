import { Datetime } from '@ionic/angular';

interface WorkingHours {
  project: Project;
  from: Datetime;
  to: Datetime;
  comment: string;
  minutesSpent: string;
}
