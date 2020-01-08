import { Injectable } from '@angular/core';
import { UmbracoFlatPropertyModel } from '../models/umbraco/model';

@Injectable({
  providedIn: 'root'
})
export class ServerResponseDataMapperService {

  map(data: any)
  {
    return this.createFlatModel(data);
  }

  private createFlatModel(prop: any)
  {
    return new UmbracoFlatPropertyModel(prop);
  }
}
