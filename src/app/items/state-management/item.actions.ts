import { BaseAction } from '../../shared/state-management/actions/base.action';
import { Item } from '../types/item';
import { ItemFormData } from '../types/item-form-data';

export const LOAD_ITEMS = 'LOAD_ITEMS';
export const LOAD_ITEMS_SUCCESS = 'LOAD_ITEMS_SUCCESS';
export const LOAD_ITEMS_FAILURE = 'LOAD_ITEMS_FAILURE';

export const CREATE_ITEM = 'CREATE_ITEM';
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
export const CREATE_ITEM_FAILURE = 'CREATE_ITEM_FAILURE';

export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';

export const EDIT_ITEM = 'EDIT_ITEM';
export const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS';
export const EDIT_ITEM_FAILURE = 'EDIT_ITEM_FAILURE';

// Load
export class LoadItemsAction extends BaseAction<undefined> {
  constructor() {
    super(LOAD_ITEMS);
  }
}

export class LoadItemsSuccessAction extends BaseAction<Item[]> {
  constructor(items: Item[]) {
    super(LOAD_ITEMS_SUCCESS, items);
  }
}

export class LoadItemsFailureAction extends BaseAction<Item[]> {
  constructor() {
    super(LOAD_ITEMS_FAILURE);
  }
}

// Create
export class CreateItemAction extends BaseAction<ItemFormData> {
  constructor(payload: ItemFormData) {
    super(CREATE_ITEM, payload);
  }
}

export class CreateItemSuccessAction extends BaseAction<Item> {
  constructor(payload: Item) {
    super(CREATE_ITEM_SUCCESS, payload);
  }
}

export class CreateItemFailureAction extends BaseAction<ItemFormData> {
  constructor(payload: ItemFormData) {
    super(CREATE_ITEM_FAILURE, payload);
  }
}

// Delete
export class DeleteItemAction extends BaseAction<Item> {
  constructor(item: Item) {
    super(DELETE_ITEM, item);
  }
}

export class DeleteItemSuccessAction extends BaseAction<Item> {
  constructor(item: Item) {
    super(DELETE_ITEM_SUCCESS, item);
  }
}

export class DeleteItemFailureAction extends BaseAction<Item> {
  constructor(item: Item) {
    super(DELETE_ITEM_FAILURE, item);
  }
}

// Edit
export class EditItemAction extends BaseAction<Item> {
  constructor(payload: Item) {
    super(EDIT_ITEM, payload);
  }
}

export class EditItemSuccessAction extends BaseAction<Item> {
  constructor(payload: Item) {
    super(EDIT_ITEM_SUCCESS, payload);
  }
}

export class EditItemFailureAction extends BaseAction<Item> {
  constructor(payload: Item) {
    super(EDIT_ITEM_FAILURE, payload);
  }
}

export type LoadItemsActions = LoadItemsAction | LoadItemsSuccessAction | LoadItemsFailureAction;
export type CreateItemActions = CreateItemAction | CreateItemSuccessAction | CreateItemFailureAction;
export type DeleteItemActions = DeleteItemAction | DeleteItemSuccessAction | DeleteItemFailureAction;
export type EditItemActions = EditItemAction | EditItemSuccessAction | EditItemFailureAction;

export type ItemActions = LoadItemsActions | CreateItemActions | DeleteItemActions | EditItemActions;
