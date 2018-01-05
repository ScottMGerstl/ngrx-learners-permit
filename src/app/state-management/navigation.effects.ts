import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { BaseAction } from '../shared/state-management/actions/base.action';
import { REDIRECT } from './navigation.actions';

@Injectable()
export class NavigationEffects {

  constructor(private actions$: Actions, private router: Router) { }

  @Effect({ dispatch: false }) public loadItems$: Observable<Action> = this.actions$
    .ofType(REDIRECT)
    .do((action: BaseAction<string>) => {
      this.router.navigate([action.payload]);
    });
}
