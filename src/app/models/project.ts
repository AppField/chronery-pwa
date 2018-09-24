import { Timestamps } from './timestamps';

export class Project extends Timestamps {
  name: string;
  number: string;
  active: boolean;

  constructor(name?: string, number?: string) {
    super();
    this.name = name || '';
    this.number = number || '';
    this.active = true;
  }
}
