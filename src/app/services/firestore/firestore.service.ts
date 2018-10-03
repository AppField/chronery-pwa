import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Timestamps } from '../../models/timestamps';
import { FirebaseQuery } from '../../models/firebase-query';

export class FirestoreService<Item extends Timestamps> {
  private readonly collectionPath: string;
  private _items$ = new BehaviorSubject<Item[]>([]);
  private _filteredItems$ = new BehaviorSubject<Item[]>([]);

  // Normal collection
  collection: AngularFirestoreCollection<Item>;
  items$ = this._items$.asObservable();

  // Filtered collection
  filteredCollection: AngularFirestoreCollection<Item>;
  filteredItems$ = this._filteredItems$.asObservable();


  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private readonly collectionName: string,
    private readonly queries?: FirebaseQuery[]
  ) {
    const uid = this.afAuth.auth.currentUser.uid;

    this.collectionPath = `users/${uid}/${this.collectionName}`;

    this.collection = this.afs
      .collection<Item>(this.collectionPath, ref => {

        let newRef = ref.orderBy('createdAt', 'desc');
        this.queries.forEach((query: FirebaseQuery) => {
          newRef = newRef.where(query.field, query.operator, query.value);
        });


        return newRef;
      });

    this.setupSnapshotChanges(this.collection, this._items$);
  }


  private setupSnapshotChanges(collection: AngularFirestoreCollection, itemsSubject: BehaviorSubject<Item[]>): void {
    collection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const item = data as Item;
            item.id = a.payload.doc.id;
            return item;
          });
        })
      )
      .subscribe((items: Item[]) => {
        console.log('SNAPSHOT CHANGED', items);
        itemsSubject.next(items);
      });
  }

  async addItem(item: Item) {
    return await this.collection.add(item);
  }

  async filterItems(queries: FirebaseQuery[]) {

    this.filteredCollection = this.afs
      .collection<Item>(this.collectionPath, ref => {
        let newRef = ref.orderBy('createdAt', 'desc');
        queries.forEach((query: FirebaseQuery) => {
          newRef = newRef.where(query.field, query.operator, query.value);
        });
        return newRef;
      });

    this.setupSnapshotChanges(this.filteredCollection, this._filteredItems$);
  }

  async updateItem(item: Item) {
    try {
      // Firestore needs an object, not an instance of a class. Cast it to an object
      const copied = Object.assign({}, item) as Item;
      const id = copied.id;
      copied.id = null;

      const updatedItem = await this.collection.doc(`/${id}`).update(copied);
      console.log('item updated', updatedItem);
    } catch (error) {
      console.log('error updating item', error);
    }
  }
}
