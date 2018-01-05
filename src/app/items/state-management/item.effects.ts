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
  CREATE_ITEM, CreateItemAction, CreateItemFailureAction,
  CreateItemSuccessAction, DELETE_ITEM, DeleteItemAction,
  DeleteItemFailureAction, DeleteItemSuccessAction, EDIT_ITEM, EditItemAction,
  EditItemFailureAction, EditItemSuccessAction, LOAD_ITEMS, LoadItemsAction, LoadItemsFailureAction, LoadItemsSuccessAction
} from './item.actions';

@Injectable()
export class ItemEffects {

  constructor(private itemsService: ItemsService, private actions$: Actions) { }

  /**
   * Retrieves items to be loaded into the store
   *
   * @type {Observable<BaseAction<Item[]>>}
   * @memberof ItemEffects
   */
  @Effect() public loadItems$: Observable<Action> = this.actions$
    .ofType(LOAD_ITEMS)
    .switchMap((action: LoadItemsAction) =>
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
    .switchMap((action: CreateItemAction) => {
        return this.itemsService.createItem(action.payload)
          .mergeMap((data: Item) => {
            const actions = [new CreateItemSuccessAction(data)];

            if (action.payload.successActions) {
              actions.push(...action.payload.successActions);
            }

            return actions;
          })
          .catch(() => of(new CreateItemFailureAction(action.payload)));
    });


  /**
   * Deletes an item
   *
   * @type {Observable<Action>}
   * @memberof ItemEffects
   */
  @Effect() public deleteItem$: Observable<Action> = this.actions$
    .ofType(DELETE_ITEM)
    .switchMap((action: DeleteItemAction) =>
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
    .switchMap((action: EditItemAction) =>
      this.itemsService.editItem(action.payload)
        .mergeMap((data: Item) => {
          const actions = [new EditItemSuccessAction(data)];

          if (action.payload.successActions) {
            actions.push(...action.payload.successActions);
          }

          return actions;
        })
        .catch(() => of(new EditItemFailureAction(action.payload))));
}
