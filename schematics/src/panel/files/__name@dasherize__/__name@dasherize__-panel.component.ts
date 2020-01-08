<%
  const panelClassName = classify(name + 'Panel');
  const selectorName = dasherize(panelClassName);
  const fileName = `${dasherize(name)}-panel`;
%>import { Component, ViewEncapsulation } from '@angular/core';
import { <%= 'I' + panelClassName %> } from './<%= fileName %>.interface';

@Component({
  selector: '<%= selectorName %>',
  templateUrl: './<%= fileName %>.html',
  styleUrls: ['./<%= fileName %>.less'],
  encapsulation: ViewEncapsulation.None
})
export class <%= panelClassName %> {
  data: <%= 'I' + panelClassName %>;
}