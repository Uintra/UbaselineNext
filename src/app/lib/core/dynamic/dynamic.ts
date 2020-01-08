import { InjectionToken } from '@angular/core';

export interface IDynamicComponent {
    id: string;
    path: string;
    loadChildren: string;
    dataMapper?: {map: (data: any) => any};
}
export const DYNAMIC_COMPONENTS = new InjectionToken<IDynamicComponent[]>('DynamicComponents');
export const AS_DYNAMIC_COMPONENT = new InjectionToken<any>('AsDynamicComponent');