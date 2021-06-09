import { ChangeDetectorRef, Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicComponentLoaderService } from '../../../core/dynamic/dynamic-loader';
import { ResolveService } from './resolve.service';

@Component({
  selector: 'ubl-resolve',
  template: '',
  styles: ['']
})
export class ResolveComponent implements OnInit {
  data: any;

  constructor(
    protected route: ActivatedRoute,
    private resolveService: ResolveService,
    private cd: ChangeDetectorRef,
    private vc: ViewContainerRef,
    private dynamicComponentLoaderService: DynamicComponentLoaderService,
  ) {}

  ngOnInit(): void {
    this.data = this.route.snapshot.data.data;
    this.loadComponentTo(this.vc);
    
    this.resolveService.pageDataChanged$.subscribe(data => {
      this.data = data;
      this.vc.clear();
      this.loadComponentTo(this.vc);
    })
  }

  private loadComponentTo(containerRef: ViewContainerRef) {
    this.dynamicComponentLoaderService.getComponentFactory((this.data && this.data.contentTypeAlias) || 'notFoundPage').subscribe(
      factory => {
        if (!factory) return;

        const component = containerRef.createComponent<any>(factory);

        component.instance.data = this.data;
      },
      error => { debugger; }
    );
  }
}
