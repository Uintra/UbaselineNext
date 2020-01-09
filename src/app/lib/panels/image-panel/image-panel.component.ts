import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { IUProperty } from '../../core/interface/umbraco-property';
import { resolveThemeCssClass } from '../../helper/panel-settings';

export interface ILinkProperty {
  url: string;
  target: string;
}
export interface ImagePanelData {
  image?: IUProperty<any>;
  link?: IUProperty<ILinkProperty>;
  description?: IUProperty<string>;
  panelSettings?: any;
  anchor: IUProperty<string>
}
@Component({
  selector: 'app-image-panel',
  templateUrl: './image-panel.component.html',
  styleUrls: ['./image-panel.component.less']
})
export class ImagePanelComponent {
  @Input() data: ImagePanelData;
  @HostBinding('class') get hostClasses() {return resolveThemeCssClass(this.data.panelSettings)}
}
