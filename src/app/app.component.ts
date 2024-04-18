import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DxSelectBoxModule, DxCheckBoxModule } from 'devextreme-angular';
import { DxListModule } from 'devextreme-angular/ui/list';
import {
  GroupRenderedEvent,
  ItemClickEvent,
  SelectionChangedEvent,
  OptionChangedEvent,
} from 'devextreme/ui/list';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DxSelectBoxModule,
    DxListModule,
    DxCheckBoxModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'checkboxes-list';
  selectedItemKeys = [1];

  items = [
    { id: 1, text: 'Value 1' },
    { id: 2, text: 'Value 2' },
    { id: 3, text: 'Value 3' },
  ];

  onItemClick(e: ItemClickEvent) {
    console.log('onItemClick: ', e);
  }

  doServerSideCall() {
    alert('Server side call');
  }

  onGroupRendered(e: GroupRenderedEvent) {
    this.doServerSideCall();
  }

  onSelectionChanged(e: SelectionChangedEvent) {
    console.log('onSelectionChanged: ', e);
  }

  onOptionChanged(e: any) {
    if (e.name === 'selectedItems') {
      console.log('onOptionChanged: ', e);
      if (e.value && e.value.length > 0) {
        const ids = e.value.map((x: { id: number }) => x.id);
        const maxId = _.max(ids);
        if (maxId === 1) {
          e.preventDefault();
          this.selectedItemKeys = [1];
        }

        if (maxId === 2) {
          e.preventDefault();
          this.selectedItemKeys = [1, 2];
          
        }

        if (maxId === 3) {
          e.preventDefault();
          this.selectedItemKeys = [1, 2, 3];
        }
      }
    }
  }
}
