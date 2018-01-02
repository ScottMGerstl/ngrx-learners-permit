export class ListItemClickData<T> {
  public type: ListItemActionType;
  public payload: T;

  constructor(type: ListItemActionType, payload: T) {
    this.type = type;
    this.payload = payload;
  }
}

export type ListItemActionType = 'detail' | 'edit' | 'delete';
