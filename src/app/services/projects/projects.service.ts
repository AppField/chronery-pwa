import { Injectable } from '@angular/core';
import { Project } from '../../models/project';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private _projects$ = new BehaviorSubject<Project[]>([]);

  projectsCollection: AngularFirestoreCollection<Project>;

  projects$ = this._projects$.asObservable();

  constructor(private afs: AngularFirestore,
              private afAuth: AngularFireAuth) {
    const uid = this.afAuth.auth.currentUser.uid;

    this.projectsCollection = afs
      .collection(`users/${uid}/projects`, ref => ref.orderBy('createdAt', 'desc'));

    this.projectsCollection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const project = new Project(data.name, data.number, data.active);
            project.id = a.payload.doc.id;
            return project;
          });
        })
      )
      .subscribe((projects: Project[]) => {
        console.log('SNAPSHOT CHANGE', projects);
        this._projects$.next(projects);
      });
  }

  async createProject(project: Project) {
    return await this.projectsCollection.add({ ...project });
  }

  async updateProject(project: Project) {
    try {
      // set id to null since it's not a part of the actual document of the firestore object
      project = { ...project };
      const id = project.id;
      project.id = null;
      const updatedProject = await this.projectsCollection.doc(`/${id}`).update({ ...project });
      console.log('updated project', updatedProject);
    } catch (error) {
      console.log('error updating project', error);
    }
  }

}
