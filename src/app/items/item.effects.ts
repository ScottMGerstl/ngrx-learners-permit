import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { BaseAction } from '../shared/state-management/actions/base.action';
import { ItemsService } from './services/items.service';
import { Item } from './types/item';

import {
  LOAD_ITEMS, LoadItemsSuccessAction, LoadItemsFailureAction,
  DELETE_ITEM, DeleteItemSuccessAction, DeleteItemFailureAction,
  EDIT_ITEM, EditItemSuccessAction, EditItemFailureAction
} from './item.actions';

@Injectable()
export class ItemEffects {

  constructor(private itemsService: ItemsService, private actions$: Actions) { }

  @Effect() loadItems: Observable<BaseAction<Item[]>> = this.actions$.ofType(LOAD_ITEMS)
    .switchMap((action: BaseAction<Item[]>) => {
      return this.itemsService.getItems()
        .map((data: Item[]) => new LoadItemsSuccessAction(data))
        .catch(() => of(new LoadItemsFailureAction()));
    });


  @Effect() deleteItem: Observable<BaseAction<Item>> = this.actions$.ofType(DELETE_ITEM)
    .switchMap((action: BaseAction<Item>) => {
      return this.itemsService.deleteItem(action.payload)
        .map((data: Item) => new DeleteItemSuccessAction(data))
        .catch(() => of(new DeleteItemFailureAction(action.payload)));
    });


  @Effect() editItem: Observable<BaseAction<Item>> = this.actions$.ofType(EDIT_ITEM)
    .switchMap((action: BaseAction<Item>) => {
      return this.itemsService.editItem(action.payload)
        .map((data: Item) => new EditItemSuccessAction(data))
        .catch(() => of(new EditItemFailureAction(action.payload)));
    });
}
