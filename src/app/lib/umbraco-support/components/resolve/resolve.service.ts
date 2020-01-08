import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, DefaultUrlSerializer, Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UMBRACO_SUPPORT_CONFIG, IUmbracoConfig } from '../../config';
import { ServerResponseDataMapperService } from '../../mappers/server-response-data-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveService implements Resolve<any> {

  urlParser = new DefaultUrlSerializer();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(UMBRACO_SUPPORT_CONFIG) private config: IUmbracoConfig,
    private defaultDataMapper: ServerResponseDataMapperService
  ) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    const data = await this.http.get(this.creteUmbracoGetByUrl(state.url)).toPromise(); // TODO: handle 404|500
    const dynamicUrl  = state.url.replace(/\%2F/g, '').substr(1);
    const dynamicRoute = dynamicUrl.split('?').shift();
    const { queryParams } = this.urlParser.parse(dynamicUrl);
    const existedRoute = this.router.config.find(page => page.path === dynamicRoute);
    route
    if (!existedRoute)
    {
      const pageConfig = this.config.pages.find((page: Route & {id: string}) => page.id === data['contentTypeAlias']);
      if (!pageConfig)
      {
        !this.config.environment.production && console.log(data);
        // TODO: go to 404
        console.log('go to 404')
        return null;
      }
      let test = this.defaultDataMapper.map(data).toJSON();

      this.router.config.unshift({
        path: dynamicRoute,
        loadChildren: pageConfig.loadChildren,
        data: test
      });
    }

    this.router.navigate([dynamicRoute], { queryParams: queryParams}).then(() => {
      const config = this.config.pages.find(page => page.id === data['contentTypeAlias']);

      if (config && config.cache === false) this.router.config.shift();
    });

    return null;
  }

  private creteUmbracoGetByUrl(url: string)
  {
    const prefix = this.config.apiPrefix;
    const host = window.location.origin; // TODO: Make service

    return `${prefix}/node/getByUrl?url=${host}${url}`;
  }
}
