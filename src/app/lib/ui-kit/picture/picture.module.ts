import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './picture.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [PictureComponent],
  imports: [
    CommonModule,
    LazyLoadImageModule,
  ],
  exports: [PictureComponent]
})
export class PictureModule { }
