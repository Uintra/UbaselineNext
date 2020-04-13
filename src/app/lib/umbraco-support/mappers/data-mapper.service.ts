import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataMapperService {

  constructor() { }

  private mapper(obj) {
    const isArray = Array.isArray(obj);
    const iterable = this.getIterableObject(obj);
  ​
    iterable &&
      iterable.forEach((value, i, arr) => {
        let current = isArray ? value : obj[value];
  ​
        if (this.isObject(current)) {
          if (current.alias) {
            if (!isArray) {
              obj[value] = current.value;
            } else {
              arr[i] = current.value;
            }
            current = current.value;
          }
  ​
          this.mapper(isArray ? current : obj[value]);
        }
      });
  }
  ​
  private isObject(obj): boolean {
    return typeof obj === "object" && obj !== null;
  }
  ​
  private getIterableObject(value): any[] | null {
    if (Array.isArray(value)) {
      return value;
    }
    if (this.isObject(value)) {
      return Object.keys(value);
    }
    return null;
  };
  ​
  public mapData(obj) {
    this.mapper(obj);
    return obj;
  };
}
