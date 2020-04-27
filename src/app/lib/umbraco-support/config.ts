import { InjectionToken } from '@angular/core';
import { Route } from '@angular/router';

export interface IUmbracoPage extends Route {
    id: string;
    cache?: boolean;
    mapper?: (any) => any;
}
export interface IEnvironment {
    production: boolean;
}
export interface IUmbracoConfig {
    apiPrefix: string;
    pages: IUmbracoPage[];
    environment: IEnvironment;
}

export const UMBRACO_SUPPORT_CONFIG = new InjectionToken<IUmbracoConfig>('Umbraco support config');