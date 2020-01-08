<%
  const pageClassName = classify(name + 'Page');
  const selectorName = dasherize(pageClassName);
  const fileName = `./${dasherize(name)}-page`;
%>import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: '<%= selectorName %>',
  templateUrl: '<%= fileName %>.html',
  styleUrls: ['<%= fileName %>.less'],
  encapsulation: ViewEncapsulation.None
})
export class <%= pageClassName %> {
  data: any;

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe(data => this.data = data);
  }
}