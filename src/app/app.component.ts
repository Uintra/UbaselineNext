import { Component } from '@angular/core';
import { IDocumentPanelData } from './lib/panels/document-panel/document-panel.component';
import { TextPanelData } from './lib/panels/text-panel/text-panel.component';
import { ImagePanelData } from './lib/panels/image-panel/image-panel.component';
import { ILinksPanelData } from './lib/panels/links-panel/links-panel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ubaseline';
  documentsPanelData: IDocumentPanelData;
  textPanelData: TextPanelData;
  imagePanelData: ImagePanelData;
  linksPanelData: ILinksPanelData;
  
  ngOnInit(): void {
    this.documentsPanelData = {
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

    this.textPanelData = {
      description: {
        value: "<p>Pellentesque posuere. Praesent ut ligula non mi varius sagittis. Nunc sed turpis. Vivamus laoreet. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi.</p><p>Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Phasellus gravida semper nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Etiam ultricies nisi vel augue. Donec venenatis vulputate lorem.</p><p>In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Maecenas vestibulum mollis diam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum turpis sem, aliquet eget, lobortis pellentesque, rutrum eu, nisl. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis.</p><p>Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque ante vel mi. Maecenas egestas arcu quis ligula mattis placerat. In hac habitasse platea dictumst. Ut id nisl quis enim dignissim sagittis. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede.</p><p>Quisque malesuada placerat nisl. Phasellus tempus. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Sed lectus. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci.</p>",
      },
      link: {
        value: {
          name: "Home",
          target: null,
          type: 0,
          url: "/",
        }
      },
      anchor: {
        value: "",
      }
    }

    this.imagePanelData = {
      image: {
        value: {
          src: "https://picsum.photos/2500/1400",
          alt: "dsgfsg",
          width: 960,
          height: 640,
          sources: [
            {
              media: "",
              srcSet: "https://picsum.photos/2500/1400"
            },
          ],
        },
        alias: "image",
        propertyEditorAlias: "UBaseline.ImagePickerSingle",
      },
      link: {
        value: {
          target: null,
          url: "/",
        },
        alias: "link",
        propertyEditorAlias: "UrlPickerSingle",
      },
      description: {
        value: " Some test description",
        alias: "description",
        propertyEditorAlias: "Umbraco.TextArea",
      },
      anchor: {
        value: "",
        alias: "anchor",
        propertyEditorAlias: "UBaseline.AnchorField",
      }
    }

    this.linksPanelData = {
      title: {
        value: 'Some test title',
        alias: "title",
        propertyEditorAlias: "Umbraco.TextBox",
      },
      links: {
        value: [
          {
            name: "Home",
            target: null,
            type: 0,
            url: "/",
          },
        ],
        alias: "links",
        propertyEditorAlias: "UrlPickerMulti",
      },
      anchor: {
        value: "",
        alias: "anchor",
        propertyEditorAlias: "UBaseline.AnchorField",
      }
    }
  }
}
