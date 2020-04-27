import { Injectable, Injector, NgModuleFactoryLoader, Inject, ComponentFactory } from '@angular/core';
import { DYNAMIC_COMPONENTS, IDynamicComponent, AS_DYNAMIC_COMPONENT } from './dynamic';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentLoaderService {

  constructor(
    @Inject(DYNAMIC_COMPONENTS) private componentDeclarations: IDynamicComponent[],
    private loader: NgModuleFactoryLoader,
    private injector: Injector
  ) { }

  async resolveComponentFactory(componentId: string, injector?: Injector): Promise<ComponentFactory<any>>
  {
    const declaration = this.getDeclarationByComponentId(componentId);

    if (!declaration) return null;

    const ngModuleFactory = await this.loader.load(declaration.loadChildren);
    const moduleRef = ngModuleFactory.create(injector || this.injector);
    const dynamicComponentClass = moduleRef.injector.get(AS_DYNAMIC_COMPONENT);

    return moduleRef.componentFactoryResolver.resolveComponentFactory(dynamicComponentClass);
  }

  getComponentFactory<T>(componentId: string, injector?: Injector): Observable<ComponentFactory<T>>
  {
      const manifest = this.componentDeclarations.find(m => m.id === componentId);

      if (!manifest) return of(null);

      const p = this.loader.load(manifest.loadChildren)
        .then(ngModuleFactory => {
          const moduleRef = ngModuleFactory.create(injector || this.injector);

          // Read from the moduleRef injector and locate the dynamic component type
          const dynamicComponentType = moduleRef.injector.get(AS_DYNAMIC_COMPONENT);
          // Resolve this component factory
          return moduleRef.componentFactoryResolver.resolveComponentFactory<T>(dynamicComponentType);
        });

      return from(p);
    }

    resolveDataMapperFor(componentId: string)
    {
      const manifest = this.componentDeclarations.find(m => m.id === componentId);

      return manifest && manifest.mapper;
    }

    private getDeclarationByComponentId(id: string)
    {
      return this.componentDeclarations.find(i => i.id === id);
    }
}