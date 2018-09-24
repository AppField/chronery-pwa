export class Timestamps {
  uid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.createdAt = new Date();
  }
}
