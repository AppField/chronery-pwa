import { Injectable } from '@angular/core';
import { Project } from '../../models/project';
import { FirestoreService } from '../firestore/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseQuery } from '../../models/firebase-query';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends FirestoreService<Project> {

  constructor(
    afs: AngularFirestore,
    afAuth: AngularFireAuth
  ) {
    super(afs, afAuth, 'projects',
      [
        { field: 'active', operator: '==', value: true } as FirebaseQuery
      ]
    );
  }

  updateHideInactive(hideInactive: boolean): void {
    console.log('filter!', hideInactive);
    const inactiveQuery = [{ field: 'active', operator: '==', value: hideInactive } as FirebaseQuery];
    this.filterItems(inactiveQuery);
  }


}
