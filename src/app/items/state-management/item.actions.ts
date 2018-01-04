import { BaseAction } from '../../shared/state-management/actions/base.action';

import { Item } from '../types/item';
import { ItemFormData } from '../types/item-form-data';

// Load
export const LOAD_ITEMS = 'LOAD_ITEMS';
export class LoadItemsAction extends BaseAction<undefined> {
  constructor() {
    super(LOAD_ITEMS);
  }
}

export const LOAD_ITEMS_SUCCESS = 'LOAD_ITEMS_SUCCESS';
export class LoadItemsSuccessAction extends BaseAction<Item[]> {
  constructor(items: Item[]) {
    super(LOAD_ITEMS_SUCCESS, items);
  }
}

export const LOAD_ITEMS_FAILURE = 'LOAD_ITEMS_FAILURE';
export class LoadItemsFailureAction extends BaseAction<Item[]> {
  constructor() {
    super(LOAD_ITEMS_FAILURE);
  }
}

export type LoadItemsActions = LoadItemsAction | LoadItemsSuccessAction | LoadItemsFailureAction;

// Create
export const CREATE_ITEM = 'CREATE_ITEM';
export class CreateItemAction extends BaseAction<ItemFormData> {
  constructor(payload: ItemFormData) {
    super(CREATE_ITEM, payload);
  }
}

export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
export class CreateItemSuccessAction extends BaseAction<Item> {
  constructor(payload: Item) {
    super(CREATE_ITEM_SUCCESS, payload);
  }
}

export const CREATE_ITEM_FAILURE = 'CREATE_ITEM_FAILURE';
export class CreateItemFailureAction extends BaseAction<ItemFormData> {
  constructor(payload: ItemFormData) {
    super(CREATE_ITEM_FAILURE, payload);
  }
}

export type CreateItemActions = CreateItemAction | CreateItemSuccessAction | CreateItemFailureAction;

// Delete
export const DELETE_ITEM = 'DELETE_ITEM';
export class DeleteItemAction extends BaseAction<Item> {
  constructor(item: Item) {
    super(DELETE_ITEM, item);
  }
}

export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export class DeleteItemSuccessAction extends BaseAction<Item> {
  constructor(item: Item) {
    super(DELETE_ITEM_SUCCESS, item);
  }
}

export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';
export class DeleteItemFailureAction extends BaseAction<Item> {
  constructor(item: Item) {
    super(DELETE_ITEM_FAILURE, item);
  }
}

export type DeleteItemActions = DeleteItemAction | DeleteItemSuccessAction | DeleteItemFailureAction;

// Edit
export const EDIT_ITEM = 'EDIT_ITEM';
export class EditItemAction extends BaseAction<Item> {
  constructor(payload: Item) {
    super(EDIT_ITEM, payload);
  }
}

export const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS';
export class EditItemSuccessAction extends BaseAction<Item> {
  constructor(payload: Item) {
    super(EDIT_ITEM_SUCCESS, payload);
  }
}

export const EDIT_ITEM_FAILURE = 'EDIT_ITEM_FAILURE';
export class EditItemFailureAction extends BaseAction<Item> {
  constructor(payload: Item) {
    super(EDIT_ITEM_FAILURE, payload);
  }
}

export type EditItemActions = EditItemAction | EditItemSuccessAction | EditItemFailureAction;
