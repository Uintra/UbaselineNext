<%
  const panelClassName = classify(name + 'Panel');
  const moduleClassName = classify(panelClassName + 'Module');
%>import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AS_DYNAMIC_COMPONENT, NotImplementedModule } from '@ubaseline/next';
import { <%= panelClassName %> } from './<%= dasherize(name) %>-panel.component';

@NgModule({
  declarations: [<%= panelClassName %>],
  imports: [
    CommonModule,
    NotImplementedModule
  ],
  providers: [{provide: AS_DYNAMIC_COMPONENT, useValue: <%= panelClassName %>}],
  entryComponents: [<%= panelClassName %>]
})
export class <%= moduleClassName %> {}