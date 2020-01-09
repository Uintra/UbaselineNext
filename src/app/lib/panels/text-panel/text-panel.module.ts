import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextPanelComponent } from './text-panel.component';
import { TextModule } from '../../ui-kit/text/text.module';
import { LinkModule } from '../../ui-kit/link/link.module';

@NgModule({
  declarations: [TextPanelComponent],
  imports: [
    CommonModule,
    TextModule,
    LinkModule
  ],
  exports: [TextPanelComponent]
})
export class TextPanelModule { }
