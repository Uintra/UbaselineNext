import { InjectionToken } from '@angular/core';

export interface IDynamicComponent {
    id: string;
    path: string;
    loadChildren: string;
    mapper?: (any) => any;
}
export const DYNAMIC_COMPONENTS = new InjectionToken<IDynamicComponent[]>('DynamicComponents');
export const AS_DYNAMIC_COMPONENT = new InjectionToken<any>('AsDynamicComponent');