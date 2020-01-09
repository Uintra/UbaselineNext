import { Component, OnInit, Input } from '@angular/core';

export interface IDocumentPanelData {
  title: string;
  description: string;
  documents: IDocumentItem[];
}

export interface IDocumentItem {
  url: string;
  name: string;
  extension: string;
}

@Component({
  selector: 'document-panel',
  templateUrl: './document-panel.component.html',
  styleUrls: ['./document-panel.component.less']
})
export class DocumentPanelComponent implements OnInit {
  @Input() data: IDocumentPanelData;
  @Input() isRightColumn: boolean;

  constructor() { }

  ngOnInit() {
  }
}
