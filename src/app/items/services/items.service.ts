import { Injectable } from '@angular/core';
import { Item } from '../types/item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemsService {

  private data: Item[] = [{ id: 1, name: 'This is item number One' }, { id: 2, name: 'This is item number Two' }];

  public getItems(): Observable<Item[]> {
    return Observable.create((observer) => { observer.next(this.data); });
  }

  public deleteItem(item: Item): Observable<Item> {

    const newData: Item[] = this.data.filter(d => d.id !== item.id);

    if (newData.length < this.data.length) {
      return Observable.create((observer) => { observer.next(item); });
    }
    else {
      return Observable.create((observer) => { observer.error(item); });
    }
  }

  public editItem(item: Item): Observable<Item> {

      const editIndex = this.data.findIndex(d => d.id === item.id);

      if (editIndex > -1) {
        this.data = Object.assign([], this.data, { [editIndex]: item });
        return Observable.create((observer) => { observer.next(item); });
      }
      else {
        return Observable.create((observer) => { observer.error(item); });
      }
    }
}
