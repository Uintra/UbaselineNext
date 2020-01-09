import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePanelComponent } from './image-panel.component';
import { PictureModule } from '../../ui-kit/picture/picture.module';
import { TextModule } from '../../ui-kit/text/text.module';

@NgModule({
  declarations: [ImagePanelComponent],
  imports: [
    CommonModule,
    PictureModule,
    TextModule
  ],
  exports: [ImagePanelComponent]
})
export class ImagePanelModule { }
