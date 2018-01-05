import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { ItemsModule } from './items/items.module';
import { AddButtonComponent } from './shared/components/add-button/add-button.component';
import { RedirectAction } from './state-management/navigation.actions';
import { NavigationEffects } from './state-management/navigation.effects';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'items' },
  { path: 'items', loadChildren: 'items/items.module#ItemsModule', data: { preload: true } }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ItemsModule,
    EffectsModule.forRoot([NavigationEffects]),
    StoreModule.forRoot({ routerReducer: routerReducer }),
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
