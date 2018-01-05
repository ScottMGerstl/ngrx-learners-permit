import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Item } from '../types/item';
import { ItemFormData } from '../types/item-form-data';

@Injectable()
export class ItemsService {

  private data: Item[] = [{ id: 1, name: 'This is item number One' }, { id: 2, name: 'This is item number Two' }];

  /**
   * Gets a list of item currently in the data repository
   *
   * @returns {Observable<Item[]>} an observable containing the results
   * @memberof ItemsService
   */
  public getItems(): Observable<Item[]> {
    return Observable.create((observer) => { observer.next(this.data); });
  }

  /**
   * Creates an item in the data repository
   *
   * @param {ItemFormData} data the data to create the item with
   * @returns {Observable<Item>} an observable containing the new item
   * @memberof ItemsService
   */
  public createItem(data: ItemFormData): Observable<Item> {

    const createdItem: Item = {
      id: (this.data[this.data.length - 1] || { id: 0 }).id + 1,
      name: data.name
    };

    this.data = [ ...this.data, createdItem ];

    return Observable.create((observer) => { observer.next(createdItem); });
  }

  /**
   * Deletes an item from the data repository
   *
   * @param {Item} item the item to remove
   * @returns {Observable<Item>} the result of the delete operation
   * @memberof ItemsService
   */
  public deleteItem(item: Item): Observable<Item> {

    const newData: Item[] = this.data.filter(d => d.id !== item.id);

    if (newData.length < this.data.length) {
      this.data = newData;

      return Observable.create((observer) => { observer.next(item); });
    }
    else {
      return Observable.create((observer) => { observer.error(item); });
    }
  }

  /**
   * Updates an item from the data repository
   *
   * @param {Item} item the item to update
   * @returns {Observable<Item>} the result of the update operation
   * @memberof ItemsService
   */
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
