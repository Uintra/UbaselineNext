import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'document-panel',
  templateUrl: './document-panel.component.html',
  styleUrls: ['./document-panel.component.less']
})
export class DocumentPanelComponent implements OnInit {
  data: any;

  constructor() { }

  ngOnInit() {
    this.data = {
      title: 'Some title',
      description: 'Fusce pretium gravida nibh, vel ultricies diam luctus imperdiet. Vestibulum vel sodales leo. Donec tortor turpis, ultricies id nunc vitae, faucibus efficitur eros. Mauris sit amet quam facilisis velit mollis faucibus nec id erat.',
      documents: [
        {
          url: "/media/1vilpggz/testworddoc.doc",
          name: "TestWordDoc.doc (2)",
          extension: "doc",
        },
        {
          url: "/media/1vilpggz/testworddoc.doc",
          name: "TestWordDoc.pdf",
          extension: "pdf",
        },
      ]
    }
  }

}
