import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICategoria } from './../interface/icategoria';



@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

private categoriaCollection: AngularFirestoreCollection<ICategoria>;
private categorias: Observable<ICategoria[]>;

  constructor(
    private db: AngularFirestore,
        ) {
              this.categoriaCollection = this.db.collection<ICategoria>('categorias');

              this.categorias = this.categoriaCollection.snapshotChanges().pipe(
                map(actions => {
                  return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                  });
                })
              );

               }

getCategorias() {
  return this.categorias;
}


getCategoria(id) {
  console.log(id);
  return this.categoriaCollection.doc<ICategoria>(id.toString()).valueChanges();
}


}
