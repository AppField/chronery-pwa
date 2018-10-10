import { AngularFirestore, AngularFirestoreCollection, CollectionReference, Query } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Timestamps } from '../../models/timestamps';
import { FirebaseQuery } from '../../models/firebase-query';

export class FirestoreService<Item extends Timestamps> {
  private readonly collectionPath: string;
  private _items$ = new BehaviorSubject<Item[]>([]);

  // Normal collection
  collection: AngularFirestoreCollection<Item>;
  items$ = this._items$.asObservable();

  // Filtered collection

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

        return this.buildQuery(ref, queries);
      });

    this.setupSnapshotChanges(this.collection, this._items$);
  }

  private buildQuery(ref: CollectionReference, queries: FirebaseQuery[]): Query {

    let newRef = ref.orderBy('createdAt', 'desc');
    queries.forEach((query: FirebaseQuery) => {
      newRef = newRef.where(query.field, query.operator, query.value);
    });

    return newRef;
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
        itemsSubject.next(items);
      });
  }

  async addItem(item: Item) {
    // Firestore needs an object, not an instance of a class. Cast it to an object
    const copied = Object.assign({}, item) as Item;
    return await this.collection.add(copied);
  }

  async updateItem(item: Item) {
    try {
      // Firestore needs an object, not an instance of a class. Cast it to an object
      const copied = Object.assign({}, item) as Item;
      const id = copied.id;
      copied.id = null;
      copied.updatedAt = new Date();

      this.collection.doc(`/${id}`).update(copied);
    } catch (error) {
      console.log('error updating item', error);
    }
  }

  async deleteItem(item: Item) {
    try {
      const deleted = await this.collection.doc(`${item.id}`).delete();
      console.log('deleted', deleted);
    } catch (error) {
      console.log('error deleting item', error);
    }
  }

  async filterItems(queries: FirebaseQuery[]): Promise<Item[]> {
    const ref = this.collection.ref;

    const queryRef = this.buildQuery(ref, queries);

    const items: Item[] = [];
    queryRef.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        const item = doc.data() as Item;
        item.id = doc.id;
        items.push(item);
      });
    });

    return items;
  }

}
