import WhereFilterOp = firebase.firestore.WhereFilterOp;

export interface FirebaseQuery {
  field: string;
  operator: WhereFilterOp;
  value: string | boolean | number;
}