import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Itipoprenda } from '../interface/itipoprenda';

@Injectable({
  providedIn: 'root'
})
export class TipoprendaproService {

private tipoPrendaCollection: AngularFirestoreCollection<Itipoprenda>;
private tipoPrenda: Observable<Itipoprenda[]>;

  constructor(
    private db: AngularFirestore
  ) {
    this.tipoPrendaCollection = this.db.collection<Itipoprenda>('TipoPrenda');
    this.tipoPrenda = this.tipoPrendaCollection.snapshotChanges().pipe(
                map(actions => {
                  return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                  });
                })
              );
   }

  getTipoPrenda() {
    return this.tipoPrenda;
  }

  getTipoPrendaId(id) {
    return this.tipoPrendaCollection.doc<Itipoprenda>(id.toString()).valueChanges();
  }

  getTipoPrendaCombos(categoria: string, subcategoria: string) {

  return  this.db.collection<Itipoprenda>('TipoPrenda', ref => ref.where('Categoria', '==', categoria)
                                                                  .where('Subcategoria', '==', subcategoria)).valueChanges();


  }

  addTipoPrenda(tipoprenda: Itipoprenda) {
        return this.tipoPrendaCollection.add(tipoprenda);
  }
}
