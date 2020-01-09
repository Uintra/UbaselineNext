import { Component, OnInit, Input, HostBinding } from '@angular/core';

export interface IProperty<T> {
  value: T;
}
export interface TextPanelData {
  description?: IProperty<String>,
  link?: IProperty<Object>;
  panelSettings?: any;
  anchor: IProperty<string>;
}

@Component({
  selector: 'text-panel',
  templateUrl: './text-panel.component.html',
  styleUrls: ['./text-panel.component.less']
})
export class TextPanelComponent implements OnInit {
  @Input() data: TextPanelData;
  @HostBinding('class') rootClasses;

  constructor() { }

  ngOnInit() {
    this.rootClasses = `
      ${ this.getTheme() || 'default-theme' }
      ${ this.getBehaviour() || 'full-content' }
    `;
  }

  getTheme() {
    if (this.data && this.data.panelSettings && this.data.panelSettings.theme && this.data.panelSettings.theme.value) {
      return this.data.panelSettings.theme.value.alias;
    }
  }

  getBehaviour() {
    if (this.data && this.data.panelSettings && this.data.panelSettings.behaviour) {
      return this.data.panelSettings.behaviour.value;
    }
  }
}
