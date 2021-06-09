import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, DefaultUrlSerializer, Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UMBRACO_SUPPORT_CONFIG, IUmbracoConfig } from '../../config';
import { SiteSettingsService, ISiteSettings } from '../../site-settings/site-settings.service';
import { DataMapperService } from '../../mappers/data-mapper.service';
import { PageIdService } from '../../../helper/page-id.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolveService implements Resolve<any> {

  urlParser = new DefaultUrlSerializer();
  pageDataChanged$ = new Subject();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(UMBRACO_SUPPORT_CONFIG) private config: IUmbracoConfig,
    private defaultDataMapper: DataMapperService,
    private siteSettingsService: SiteSettingsService,
    private pageIdService: PageIdService,
  ) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    const siteSettings = await this.siteSettingsService.getSiteSettings();
    const url = this.getUrl(route);
    const data = await this.getData(url) || await this.getData(siteSettings.pageNotFoundPageUrl || '/404');
    const dynamicUrl  = this.getUrl(route, true).substr(1);
    const dynamicRoute = dynamicUrl.split('?').shift();
    const { queryParams } = this.urlParser.parse(dynamicUrl);
    const existedRoute = this.router.config.find(page => page.path === dynamicRoute);

    const pageConfig = this.config.pages.find((page: Route & {id: string}) => page.id === data['contentTypeAlias']);
    const mappedData = pageConfig && pageConfig.mapper ? pageConfig.mapper(data) : this.defaultDataMapper.map(data);
    
    if (!existedRoute) {
      this.router.config.unshift({
        path: dynamicRoute,
        loadChildren: pageConfig.loadChildren,
        data: mappedData
      });
    } else {
      existedRoute.data = mappedData;
    }

    this.setTitlePage(siteSettings, data);
    this.pageIdService.setPageId(data && data.id.get ? data.id.get() : data && data.id);

    this.pageDataChanged$.next(data);

    return data;
  }

  private createUmbracoGetByUrl(url: string)
  {
    const prefix = this.config.apiPrefix;
    const host = window.location.origin;

    return `${prefix}/node/getByUrl?url=${host}${url}`;
  }

  private setTitlePage(siteSettings: ISiteSettings, data?: {name: string}): void {
    document.title = data ? `${data.name} ${siteSettings.pageTitleSeparator} ${siteSettings.siteTitle}` : siteSettings.siteTitle;
  }

  private getUrl(route: ActivatedRouteSnapshot, needsEncoding?: boolean): string {
    let url = "/" + route.url.map(elem => elem.path).join("/");
    const queryParamsArray = [];
    for (let param in route.queryParams) {
        queryParamsArray.push(param + "=" + (needsEncoding ? encodeURIComponent(route.queryParams[param]) : route.queryParams[param]));
    }
    if (queryParamsArray.length) {
        url += "?" + queryParamsArray.join("&");
    }
    if (route.fragment) {
      url += `#${route.fragment}`;
    }
    return url;
  }

  private async getData(url: string) {
    let data = await this.http.get<any>(this.createUmbracoGetByUrl(url)).toPromise();

    if (data && data.requiresRedirect) {
      data = await this.http.get<any>(this.createUmbracoGetByUrl(data.errorLink.originalUrl)).toPromise();
    }

    return data;
  }

  public async resolveDataOnSameUrl(url: string) {
    const data = await this.getData(url);
    const pageConfigMapper = this.config.pages.find((page: Route & {id: string}) => page.id === data['contentTypeAlias']).mapper;

    return pageConfigMapper
      ? pageConfigMapper(data)
      : this.defaultDataMapper.map(data);
  }
}
