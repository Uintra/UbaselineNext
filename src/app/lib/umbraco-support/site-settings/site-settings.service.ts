import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UMBRACO_SUPPORT_CONFIG, IUmbracoConfig } from '../config';

export interface ISiteSettings {
  siteTitle?: string;
  logoAltText?: string;
  cookieTitle?: string;
  cookieDescription?: string;
  pageTitleSeparator: string;
  pageNotFoundPageUrl: string;
}
@Injectable({
  providedIn: 'root'
})
export class SiteSettingsService {
  private cache: ISiteSettings;

  constructor(
    private http: HttpClient,
    @Inject(UMBRACO_SUPPORT_CONFIG) private config: IUmbracoConfig,
  ) { }

  async getSiteSettings() {
    if (!this.cache) {
      this.cache = await this.loadSettings().toPromise();
    }

    return this.cache;
  }

  private loadSettings() {
    return this.http.get<ISiteSettings>(`${this.config.apiPrefix}/siteSettings/get`).pipe(
      map((response: ISiteSettings) => {
        return {
          pageTitleSeparator: response.pageTitleSeparator,
          siteTitle: response.siteTitle,
          logoAltText: response.logoAltText,
          cookieTitle: response.cookieTitle,
          cookieDescription: response.cookieDescription,
          pageNotFoundPageUrl: response.pageNotFoundPageUrl
        }
      })
    )
  }
}
