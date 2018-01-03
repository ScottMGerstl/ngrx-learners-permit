
import { Item } from '../types/item';

import {
  LOAD_ITEMS_SUCCESS, DELETE_ITEM_SUCCESS, EDIT_ITEM_SUCCESS,
  DeleteItemSuccessAction, EditItemAction, CREATE_ITEM_SUCCESS,
  CreateItemAction, SELECT_ITEM, EditItemSuccessAction, CreateItemSuccessAction
} from './item.actions';

import { BaseAction } from '../../shared/state-management/actions/base.action';
import { ItemFormData } from '../types/item-form-data';

export function itemReducer(state: Item[] = [], action: BaseAction<any>) {
  switch (action.type) {
    case LOAD_ITEMS_SUCCESS: {
      return action.payload;
    }
    case SELECT_ITEM: {
      return state.find(i => i.id === action.payload);
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
      const formData: ItemFormData = (<CreateItemSuccessAction>action).payload;

      const newData: Item[] = state.slice(0);

      newData.push({
        id: state[state.length - 1].id + 1,
        name: formData.name
      });

      return newData;
    }
    default: {
      return state;
    }
  }
}
