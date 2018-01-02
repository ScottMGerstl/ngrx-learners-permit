export abstract class BaseAction<T> {
  public readonly type: string;
  public payload?: T;

  constructor(type: string, payload?: T) {
    this.type = type;
    this.payload = payload;
  }
}
