import { BaseAction } from '../shared/state-management/actions/base.action';

export const REDIRECT = 'REDIRECT';

export class RedirectAction extends BaseAction<string> {
  constructor(route: string) {
    super(REDIRECT, route);
  }
}
