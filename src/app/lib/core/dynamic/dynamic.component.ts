import { Component, ViewContainerRef, ViewChild, Input } from '@angular/core';
import { DynamicComponentLoaderService } from './dynamic-loader';
import { DataMapperService } from '../../umbraco-support/mappers/data-mapper.service';

@Component({
  selector: 'ubl-dynamic-component',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.less']
})
export class DynamicComponent {
  @Input() data: any;

  constructor(
    private dynamicComponentLoader: DynamicComponentLoaderService,
    private defaultDataMapper: DataMapperService
  ) { }

  @ViewChild('component', {read: ViewContainerRef, static: false})
  set componentOutlet(containerRef: ViewContainerRef)
  {
    if (!this.data.contentTypeAlias) return;

    this.loadComponentTo(containerRef);
  }

  private loadComponentTo(containerRef: ViewContainerRef)
  {
    this.dynamicComponentLoader.getComponentFactory(this.data.contentTypeAlias).subscribe(
      factory => {
        if (!factory) return;

        const component = containerRef.createComponent<any>(factory);
        const customDataMapper = this.dynamicComponentLoader.resolveDataMapperFor(this.data.contentTypeAlias);

        component.instance.data = customDataMapper 
          ? customDataMapper(this.data)
          : this.defaultDataMapper.map(this.data);
      },
      error => { debugger; }
    );
  }
}
