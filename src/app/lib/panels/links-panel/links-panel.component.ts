import { Component, OnInit, ViewEncapsulation, HostBinding, Input } from '@angular/core';
import { ILinksBlockData } from './links-block/links-block.component';
import { ButtonData } from '../../core/interface/button';
import { IUProperty, UProperty } from '../../core/interface/umbraco-property';

export interface ILinksPanelData {
  title: IUProperty<string>;
  links: IUProperty<ButtonData[]>;
  anchor: IUProperty<string>;
}
@Component({
  selector: 'app-links-panel',
  templateUrl: './links-panel.component.html',
  styleUrls: ['./links-panel.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class LinksPanelComponent implements OnInit {
  @Input() data: ILinksPanelData | null;
  blockLinksData: ILinksBlockData;

  @HostBinding('class') hostClass = 'app-links-panel';
  ngOnInit()
  {
    this.blockLinksData = UProperty.extract<ILinksPanelData, ILinksBlockData>(this.data, ['title', 'links'])
  }
}
