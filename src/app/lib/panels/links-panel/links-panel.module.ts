import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksPanelComponent } from './links-panel.component';
import { LinksBlockModule } from './links-block/links-block.module';

@NgModule({
  declarations: [LinksPanelComponent],
  imports: [
    CommonModule,
    LinksBlockModule
  ],
  exports: [LinksPanelComponent]
})
export class LinksPanelModule { }
