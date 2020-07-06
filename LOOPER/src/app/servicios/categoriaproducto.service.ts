import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Icategorias } from '../interface/icategorias';




@Injectable({
  providedIn: 'root'
})
export class CategoriaproductoService {

private categoriaCollection: AngularFirestoreCollection<Icategorias>;
private categorias: Observable<Icategorias[]>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.categoriaCollection = this.db.collection<Icategorias>('Categorias');
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
    return this.categoriaCollection.doc<Icategorias>(id.toString()).valueChanges();
  }

  addCategoria(categoria: Icategorias) {
        return this.categoriaCollection.add(categoria);
  }
}
