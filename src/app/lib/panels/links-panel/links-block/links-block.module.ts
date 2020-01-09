import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksBlockComponent } from './links-block.component';
import { LinkModule } from 'src/app/lib/ui-kit/link/link.module';

@NgModule({
  declarations: [LinksBlockComponent],
  imports: [
    CommonModule,
    LinkModule
  ],
  exports: [LinksBlockComponent]
})
export class LinksBlockModule { }
