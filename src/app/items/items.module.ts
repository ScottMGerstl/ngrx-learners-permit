import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item/item.component';
import { ItemsService } from './services/items.service';

import { SharedModule } from '../shared/shared.module';
import { NavigationEffects } from '../state-management/navigation.effects';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemsComponent } from './items.component';
import { ItemEffects } from './state-management/item.effects';
import { itemReducer } from './state-management/item.reducer';

const routes: Routes = [{
  path: 'items',
  component: ItemsComponent,
  children: [{
    path: '',
    component: ItemListComponent
  }, {
    path: 'add',
    component: AddItemComponent
  }, {
    path: 'edit/:item-id',
    component: EditItemComponent
  }]
}];

@NgModule({
  declarations: [
    ItemListComponent,
    ItemComponent,
    ItemFormComponent,
    AddItemComponent,
    ItemsComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([ItemEffects]),
    StoreModule.forFeature('items', itemReducer),
    SharedModule
  ],
  exports: [
    ItemsComponent
  ],
  providers: [
    ItemsService
  ]
})
export class ItemsModule { }
