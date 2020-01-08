import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotImplementedComponent } from './not-implemented.component';

@NgModule({
  declarations: [NotImplementedComponent],
  imports: [
    CommonModule
  ],
  exports: [NotImplementedComponent]
})
export class NotImplementedModule { }
