import { Component, OnInit, Input } from '@angular/core';
import { IButtonData } from 'src/app/lib/core/interface/button';
import { Link } from 'src/app/lib/core/interface/link';


export interface ILinksBlockData {
  title: string;
  links: IButtonData[];
}
@Component({
  selector: 'app-links-block',
  templateUrl: './links-block.component.html',
  styleUrls: ['./links-block.component.less']
})
export class LinksBlockComponent implements OnInit {
  @Input() data: ILinksBlockData;

  links: Link[] = [];

  ngOnInit() {
    if (this.data && this.data.links && this.data.links.length)
    {
      this.links = this.data.links.map(i => Link.fromButtonData(i));
    }
  }
}
