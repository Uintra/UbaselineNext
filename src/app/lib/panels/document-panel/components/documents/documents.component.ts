import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.less']
})
export class DocumentsComponent implements OnInit {
  @Input() documents: any;

  constructor() { }

  ngOnInit() {
  }

}
