import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';

import { ItemListComponent } from './items/item-list/item-list.component';
import { itemReducer } from './items/item.reducer';
import { ItemEffects } from './items/item.effects';
import { ItemsService } from './items/services/items.service';
import { ItemComponent } from './items/item/item.component';


@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([ItemEffects]),
    StoreModule.forRoot({items: itemReducer}),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    ItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
