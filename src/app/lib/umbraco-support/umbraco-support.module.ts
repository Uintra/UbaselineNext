import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResolveComponent } from './components/resolve/resolve.component';
import { IUmbracoConfig, UMBRACO_SUPPORT_CONFIG } from './config';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { UbaselineCoreModule } from '../core/core.module';

@NgModule({
  declarations: [ResolveComponent],
  imports: [
    CommonModule,
    UbaselineCoreModule,
  ],
  exports: [ResolveComponent]
})
export class UmbracoSupportModule {
  static resolveComponent = ResolveComponent;

  static configure(config: IUmbracoConfig): ModuleWithProviders {
    return {
      ngModule: UmbracoSupportModule,
      providers: [
        { provide: UMBRACO_SUPPORT_CONFIG, useValue: config }
      ]
    }
  }
}
