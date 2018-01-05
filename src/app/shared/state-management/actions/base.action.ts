import { Action } from '@ngrx/store';

export abstract class BaseAction<T> implements Action {
  public readonly type: string;
  public payload?: T;

  constructor(type: string, payload?: T) {
    this.type = type;
    this.payload = payload;
  }
}
