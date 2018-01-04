
import { Item } from '../types/item';

import {
  CREATE_ITEM_SUCCESS, CreateItemAction, CreateItemSuccessAction,
  DELETE_ITEM_SUCCESS, DeleteItemSuccessAction, EDIT_ITEM_SUCCESS,
  EditItemAction, EditItemSuccessAction, LOAD_ITEMS_SUCCESS
} from './item.actions';

import { BaseAction } from '../../shared/state-management/actions/base.action';
import { ItemFormData } from '../types/item-form-data';

export function itemReducer(state: Item[] = [], action: BaseAction<any>) {

  switch (action.type) {
    case LOAD_ITEMS_SUCCESS: {
      return action.payload;
    }
    case DELETE_ITEM_SUCCESS: {
      const newData: Item[] = state.filter(d => d.id !== (<DeleteItemSuccessAction>action).payload.id);

      return newData;
    }
    case EDIT_ITEM_SUCCESS: {

      const editItem: Item = (<EditItemSuccessAction>action).payload;
      const editIndex = state.findIndex(d => d.id === editItem.id);

      const newData: Item[] = Object.assign([], state, { [editIndex]: editItem });

      return newData;
    }
    case CREATE_ITEM_SUCCESS: {

      const formData: Item = (<CreateItemSuccessAction>action).payload;
      const newData: Item[] = state.slice(0);

      newData.push({
        id: formData.id,
        name: formData.name
      });

      return newData;
    }
    default: {
      return state;
    }
  }
}
