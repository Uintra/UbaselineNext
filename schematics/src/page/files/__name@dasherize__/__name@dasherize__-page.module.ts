<%
  const pageClassName = classify(name + 'Page');
  const moduleClassName = classify(pageClassName + 'Module');
%>import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UbaselineCoreModule } from '@ubaseline/next';
import { <%= pageClassName %> } from './<%= dasherize(name) %>-page.component';

@NgModule({
  declarations: [<%= pageClassName %>],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: "", component: <%= pageClassName %>}]),
    UbaselineCoreModule,
  ],
  entryComponents: [<%= pageClassName %>]
})
export class <%= moduleClassName %> {}