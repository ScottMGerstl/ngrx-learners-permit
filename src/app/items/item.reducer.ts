
import { Item } from './types/item';

import { LOAD_ITEMS_SUCCESS, DELETE_ITEM_SUCCESS, EDIT_ITEM_SUCCESS, DeleteItemSuccessAction, EditItemAction } from './item.actions';
import { BaseAction } from '../shared/state-management/actions/base.action';

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

      const editItem: Item = (<EditItemAction>action).payload;
      const editIndex = state.findIndex(d => d.id === editItem.id);

      const newData: Item[] = Object.assign([], this.data, { [editIndex]: editItem });

      return newData;
    }
    default: {
      return state;
    }
  }
}
