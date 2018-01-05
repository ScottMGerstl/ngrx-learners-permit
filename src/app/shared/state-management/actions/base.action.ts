import { Action } from '@ngrx/store';

export abstract class BaseAction<T> implements Action {
  public readonly type: string;
  public payload?: T;

  constructor(type: string, payload?: T) {
    this.type = type;
    this.payload = payload;
  }
}

export abstract class BaseActionWithActions<T> extends BaseAction<T> implements Action {
  public readonly type: string;
  public payload?: T & AdditionalActions;

  constructor(type: string, payload?: T, actions?: AdditionalActions) {
    super(type, payload);
    this.payload.successActions = (actions || {}).successActions;
  }
}
export class AdditionalActions {
  public successActions?: BaseAction<any>[];
}
