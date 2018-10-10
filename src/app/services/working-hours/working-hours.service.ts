import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore/firestore.service';
import { WorkingHours } from '../../models/working-hours';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { encodeDate } from '../../utils/utils';
import { FirebaseQuery } from '../../models/firebase-query';

@Injectable({
  providedIn: 'root'
})
export class WorkingHoursService extends FirestoreService<WorkingHours> {

  constructor(
    afs: AngularFirestore,
    afAuth: AngularFireAuth
  ) {
    super(afs, afAuth, 'working-hours',
      [
        { field: 'date', operator: '==', value: encodeDate(new Date()) } as FirebaseQuery
      ]
    );
  }

  async getWorkingHoursByDate(date: Date): Promise<void> {
    const encodedDate = encodeDate(date);
    console.log('date to query', encodedDate);
    const query = [{ field: 'date', operator: '==', value: encodedDate } as FirebaseQuery];
    this.filterCollection(query);
  }



}
