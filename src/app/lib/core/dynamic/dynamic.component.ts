import { Component, ViewContainerRef, ViewChild, Input } from '@angular/core';
import { DynamicComponentLoaderService } from './dynamic-loader';

@Component({
  selector: 'ubl-dynamic-component',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.less']
})
export class DynamicComponent {
  @Input() data: any;

  constructor(private dynamicComponentLoader: DynamicComponentLoaderService) { }

  @ViewChild('component', {read: ViewContainerRef, static: false})
  set componentOutlet(containerRef: ViewContainerRef)
  {
    if (!this.data.contentTypeAlias.get()) return;

    this.loadComponentTo(containerRef);
  }

  private loadComponentTo(containerRef: ViewContainerRef)
  {
    this.dynamicComponentLoader.getComponentFactory(this.data.contentTypeAlias.get()).subscribe(
      factory => {
        if (!factory) return;

        const component = containerRef.createComponent<any>(factory);
        const dataMapper = this.dynamicComponentLoader.resolveDataMapperFor(this.data.contentTypeAlias.get());

        component.instance.data = dataMapper ? dataMapper.map(this.data) : this.data;
      },
      error => { debugger; }
    );
  }
}
