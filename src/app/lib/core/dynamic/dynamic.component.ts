import { Component, ViewContainerRef, ViewChild, Input } from '@angular/core';
import { DynamicComponentLoaderService } from './dynamic-loader';
import { UmbracoFlatPropertyModel } from '../../umbraco-support/models/umbraco/umbraco-flat-property';
import { ServerResponseDataMapperService } from '../../umbraco-support/mappers/server-response-data-mapper.service';
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
    private serverResponseDataMapperService: ServerResponseDataMapperService,
    private defaultDataMapper: DataMapperService
  ) { }

  @ViewChild('component', {read: ViewContainerRef, static: false})
  set componentOutlet(containerRef: ViewContainerRef)
  {
    if (!this.getContentTypeAlias(this.data.contentTypeAlias)) return;

    this.loadComponentTo(containerRef);
  }

  private loadComponentTo(containerRef: ViewContainerRef)
  {
    this.dynamicComponentLoader.getComponentFactory(this.getContentTypeAlias(this.data.contentTypeAlias)).subscribe(
      factory => {
        if (!factory) return;

        const component = containerRef.createComponent<any>(factory);
        const isLegacyDataMapper = this.dynamicComponentLoader.resolveDataMapperFor(this.getContentTypeAlias(this.data.contentTypeAlias));

        component.instance.data = isLegacyDataMapper 
          ? this.data.contentTypeAlias instanceof UmbracoFlatPropertyModel
            ? this.data 
            : this.serverResponseDataMapperService.map(this.data) 
          : this.defaultDataMapper.map(this.data);
      },
      error => { debugger; }
    );
  }

  private getContentTypeAlias(contentTypeAlias: any) {
    return contentTypeAlias instanceof UmbracoFlatPropertyModel ? contentTypeAlias.get() : contentTypeAlias;
  }
}
