import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemClickData } from '../../shared/types/list-item-click-data';
import { Item } from '../types/item';

@Component({
  selector: 'app-item, [app-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {

  @Input() public item: Item;

  @Output() public itemClicked: EventEmitter<ListItemClickData<Item>> = new EventEmitter<ListItemClickData<Item>>();

  constructor() { }

  private onItemClicked(): void {
    this.itemClicked.emit(new ListItemClickData('detail', this.item));
  }

  private onEditClicked(): void {
    this.itemClicked.emit(new ListItemClickData('edit', this.item));
  }

  private onDeleteClicked(): void {
    this.itemClicked.emit(new ListItemClickData('delete', this.item));
  }

}
