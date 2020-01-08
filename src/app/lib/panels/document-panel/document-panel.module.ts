import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentPanelComponent } from './document-panel.component';
import { TextModule } from '../../ui-kit/text/text.module';
import { DocumentsComponent } from './components/documents/documents.component';

@NgModule({
  declarations: [DocumentPanelComponent, DocumentsComponent],
  imports: [
    CommonModule,
    TextModule
  ],
  exports: [DocumentPanelComponent]
})
export class DocumentPanelModule { }
