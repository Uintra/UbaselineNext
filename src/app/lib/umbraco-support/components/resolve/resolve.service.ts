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
    const url = this.getUrl(route);
    const data = await this.http.get<any>(this.createUmbracoGetByUrl(url)).toPromise(); // TODO: handle 500
    const dynamicUrl  = this.getUrl(route, true).substr(1);
    const dynamicRoute = dynamicUrl.split('?').shift();
    const { queryParams } = this.urlParser.parse(dynamicUrl);
    const existedRoute = this.router.config.find(page => page.path === dynamicRoute);
    
    if (!existedRoute)
    {
      const pageConfig = data ? this.config.pages.find((page: Route & {id: string}) => page.id === data['contentTypeAlias']) : null;
      if (!pageConfig) {
        !this.config.environment.production && console.log(data);
        
        this.router.navigate(['/404']).then(function () {
          this.setTitlePage();
        });

        return [2 /*return*/, null];
      }
      let mappedData = this.defaultDataMapper.map(data).toJSON();

      this.router.config.unshift({
        path: dynamicRoute,
        loadChildren: pageConfig.loadChildren,
        data: mappedData
      });
    }

    this.router.navigate([dynamicRoute], { queryParams: queryParams}).then(() => {
      this.setTitlePage(data);
      const config = this.config.pages.find(page => page.id === data['contentTypeAlias']);
      if (config && config.cache === false) this.router.config.shift();
    });

    return null;
  }

  private createUmbracoGetByUrl(url: string)
  {
    const prefix = this.config.apiPrefix;
    const host = window.location.origin; // TODO: Make service

    return `${prefix}/node/getByUrl?url=${host}${url}`;
  }

  private setTitlePage(data?: {name: string}) {
    if (data) {
      document.title = `${data.name} | Uintra`
    } else {
      document.title = "Uintra"
    }
  }

  private getUrl(route: ActivatedRouteSnapshot, needsEncoding?: boolean): string {
    const urlArray = route.url.map(elem => elem.path);
    let url = "/" + urlArray.join("/");
    const queryParamsArray = [];
    for (let param in route.queryParams) {
        queryParamsArray.push(param + "=" + (needsEncoding ? encodeURIComponent(route.queryParams[param]) : route.queryParams[param]));
    }
    if (queryParamsArray.length) {
        url += "?" + queryParamsArray.join("&");
    }
    return url;
  }
}
