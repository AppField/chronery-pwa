import { Injectable } from '@angular/core';
import { Project } from '../../models/project';
import { FirebaseService } from '../firebase/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import WhereFilterOp = firebase.firestore.WhereFilterOp;

interface FirebaseQuery {
  field: string;
  operator: WhereFilterOp;
  value: string | boolean | number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends FirebaseService<Project> {

  constructor(
    afs: AngularFirestore,
    afAuth: AngularFireAuth
  ) {
    super(afs, afAuth, 'projects',
      [
        { field: 'active', operator: '==', value: true } as FirebaseQuery
      ]
    );

    // .where('active', '==', true));

  }

  updateHideInactive(hideInactive: boolean): void {
    console.log('filter!', hideInactive);
    const inactiveQuery = [{ field: 'active', operator: '==', value: hideInactive } as FirebaseQuery];
    this.filterItems(inactiveQuery);
  }


}
