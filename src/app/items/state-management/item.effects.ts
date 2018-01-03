import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';

import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { BaseAction } from '../../shared/state-management/actions/base.action';
import { ItemsService } from '../services/items.service';
import { Item } from '../types/item';
import { ItemFormData } from '../types/item-form-data';

import {
  LOAD_ITEMS, LoadItemsSuccessAction, LoadItemsFailureAction,
  DELETE_ITEM, DeleteItemSuccessAction, DeleteItemFailureAction,
  EDIT_ITEM, EditItemSuccessAction, EditItemFailureAction, CREATE_ITEM, CreateItemSuccessAction, CreateItemFailureAction, FIND_ITEM
} from './item.actions';

@Injectable()
export class ItemEffects {

  constructor(private itemsService: ItemsService, private actions$: Actions, private router: Router) { }

  @Effect() loadItems$: Observable<BaseAction<Item[]>> = this.actions$.ofType(LOAD_ITEMS)
    .switchMap((action: BaseAction<Item[]>) => {
      return this.itemsService.getItems()
        .map((data: Item[]) => new LoadItemsSuccessAction(data))
        .catch(() => of(new LoadItemsFailureAction()));
    });

  @Effect() createItem$: Observable<Action> = this.actions$.ofType(CREATE_ITEM)
      .switchMap((action: BaseAction<ItemFormData>) => {
        return this.itemsService.createItem(action.payload)
          .map((data: Item) => new CreateItemSuccessAction(data))
          .do(() => this.router.navigate(['/items']))
          .catch(() => of(new CreateItemFailureAction(action.payload)));
      });

  @Effect() deleteItem$: Observable<BaseAction<Item>> = this.actions$.ofType(DELETE_ITEM)
    .switchMap((action: BaseAction<Item>) => {
      return this.itemsService.deleteItem(action.payload)
        .map((data: Item) => new DeleteItemSuccessAction(data))
        .catch(() => of(new DeleteItemFailureAction(action.payload)));
    });


  @Effect() editItem$: Observable<BaseAction<Item>> = this.actions$.ofType(EDIT_ITEM)
    .switchMap((action: BaseAction<Item>) => {
      return this.itemsService.editItem(action.payload)
        .map((data: Item) => new EditItemSuccessAction(data))
        .do(() => this.router.navigate(['/items']))
        .catch(() => of(new EditItemFailureAction(action.payload)));
    });
}
