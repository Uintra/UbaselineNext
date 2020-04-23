import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageIdService {
  public pageIdSubject = new Subject();

  constructor() { }

  public setPageId(pageId: number): void {
    this.pageIdSubject.next(pageId);
  }
}
