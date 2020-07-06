import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Isubcategoria } from '../interface/isubcategoria';


@Injectable({
  providedIn: 'root'
})
export class SubcategoriaproService {

  private subcategoriaCollection: AngularFirestoreCollection<Isubcategoria>;
  private subcategorias: Observable<Isubcategoria[]>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.subcategoriaCollection = this.db.collection<Isubcategoria>('SubCategoria');
    this.subcategorias = this.subcategoriaCollection.snapshotChanges().pipe(
                map(actions => {
                  return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                  });
                })
              );
  }

  getSubCategoria() {
    return this.subcategorias;
  }

  getSUbCategorias(id) {
    return this.subcategoriaCollection.doc<Isubcategoria>(id.toString()).valueChanges();
  }

  addSubCategoria(categoria: Isubcategoria) {
        return this.subcategoriaCollection.add(categoria);
  }
}
