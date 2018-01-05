import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { BaseAction } from '../../shared/state-management/actions/base.action';
import { ItemsService } from '../services/items.service';
import { Item } from '../types/item';
import { ItemFormData } from '../types/item-form-data';

import { RedirectAction } from '../../state-management/navigation.actions';
import {
  CREATE_ITEM, CreateItemFailureAction, CreateItemSuccessAction,
  DELETE_ITEM, DeleteItemFailureAction, DeleteItemSuccessAction,
  EDIT_ITEM, EditItemFailureAction, EditItemSuccessAction, LOAD_ITEMS,
  LoadItemsFailureAction, LoadItemsSuccessAction
} from './item.actions';

@Injectable()
export class ItemEffects {

  constructor(private itemsService: ItemsService, private actions$: Actions, private router: Router) { }

  /**
   * Retrieves items to be loaded into the store
   *
   * @type {Observable<BaseAction<Item[]>>}
   * @memberof ItemEffects
   */
  @Effect() public loadItems$: Observable<Action> = this.actions$
    .ofType(LOAD_ITEMS)
    .switchMap((action: BaseAction<Item[]>) =>
      this.itemsService.getItems()
        .map((data: Item[]) => new LoadItemsSuccessAction(data))
        .catch(() => of(new LoadItemsFailureAction())));

  /**
   * Creates an item and navigates back to the main page
   *
   * @type {Observable<Action>}
   * @memberof ItemEffects
   */
  @Effect() public createItem$: Observable<Action> = this.actions$
    .ofType(CREATE_ITEM)
    .switchMap((action: BaseAction<ItemFormData>) =>
        this.itemsService.createItem(action.payload)
          .mergeMap((data: Item) => [new CreateItemSuccessAction(data), new RedirectAction('/items')])
          .catch(() => of(new CreateItemFailureAction(action.payload))));


  /**
   * Deletes an item
   *
   * @type {Observable<Action>}
   * @memberof ItemEffects
   */
  @Effect() public deleteItem$: Observable<Action> = this.actions$
    .ofType(DELETE_ITEM)
    .switchMap((action: BaseAction<Item>) =>
      this.itemsService.deleteItem(action.payload)
        .map((data: Item) => new DeleteItemSuccessAction(data))
        .catch(() => of(new DeleteItemFailureAction(action.payload))));

  /**
   * Edits an item and navigates back to the main page
   *
   * @type {Observable<Action>}
   * @memberof ItemEffects
   */
  @Effect() public editItem$: Observable<Action> = this.actions$
    .ofType(EDIT_ITEM)
    .switchMap((action: BaseAction<Item>) =>
      this.itemsService.editItem(action.payload)
        .mergeMap((data: Item) => [new EditItemSuccessAction(data), new RedirectAction('/items')])
        .catch(() => of(new EditItemFailureAction(action.payload))));
}
