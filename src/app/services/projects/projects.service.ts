import { Injectable } from '@angular/core';
import { Project } from '../../models/project';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projectsCollection: AngularFirestoreCollection<Project>;
  projects: Observable<Project[]>;

  constructor(private afs: AngularFirestore,
              private afAuth: AngularFireAuth) {
    const uid = this.afAuth.auth.currentUser.uid;

    this.projectsCollection = afs
      .collection(`users/${uid}/projects`, ref => ref.orderBy('createdAt', 'desc'));

    this.projects = this.projectsCollection.valueChanges();
  }

  async createProject(project: Project) {

    const projectAdded = await this.projectsCollection.add({ ...project });
    console.log(projectAdded);

  }

  async updateProject(project: Project) {

  }

}
