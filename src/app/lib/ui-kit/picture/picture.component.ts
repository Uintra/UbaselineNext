import { Component, OnInit, Input, HostBinding, ElementRef } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { isString } from '../../core/util/strings/is-string';
import { IPictureData, IPictureStringData, IPictureFallbackEvent, IImageStyle } from '../../core/interface/picture';
import { isDevModeAndNoData } from './helper/is-dev-mode-and-no-data';
import { getExtension } from '../../core/util/strings/get-extension';
import { isInPictureDataNotFallback } from './helper/is-in-picture-data-not-fallback';

@Component({
  selector: 'picture[ubl-picture]',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.less']
})
export class PictureComponent implements OnInit {
  @Input() data: IPictureData | string;
  @Input() scale: number = 100;
  @Input() ratio: number;
  @Input() fallback: string;
  @HostBinding('class') className: string;
  @HostBinding('style') get hostStyle(): SafeStyle {
    if (!!this.ratio) {
      return this.sanitizer.bypassSecurityTrustStyle(
        `padding-bottom: ${(1 / this.ratio) * 100}%;
        display: block;
        height: 0;
        overflow: hidden;
        position: relative;`
      );
    }
  }

  pictureData: IPictureData | IPictureStringData = null;
  isLazyLoading: boolean = false;
  currentPictureExtension: string;
  style: IImageStyle;

  constructor(private sanitizer:DomSanitizer, private elementRef: ElementRef) {}

  getHostElement() {
    return this.elementRef.nativeElement;
  }

  hasHostAttributes(...attributes: string[]) {
    return attributes.some(attribute => this.getHostElement().hasAttribute(attribute));
  }

  ngOnInit() {
    if (isDevModeAndNoData(this.data, this.fallback)) console.error(
      `Please provide at least one of string or PictureData or fallback. In production will be used empty string as src therefore alt text will be used`
    );

    if (this.hasHostAttributes('lazy')) {
      this.isLazyLoading = true;
    }

    if (this.data && !isString(this.data)) {
      this.pictureData = this.data;
    }

    if (this.data && isString(this.data)) {
      this.pictureData = {
        alt: '',
        src: this.data,
        sources: []
      }
    }

    if (this.fallback && !this.data) {
      this.pictureData = {
        alt: '',
        src: this.fallback,
        sources: []
      }
    }
    
    this.className = `${this.elementRef.nativeElement.className} ${this.getImageExtension()} ${!!this.ratio ? 'picture--ratio' : ''} ${!isInPictureDataNotFallback(this.pictureData, this.fallback) && this.pictureData ? 'picture--fallback' : ''}`;
    
    if (!this.fallback && !this.data) {
      this.className += 'picture--fail';
      return;
    }

    this.updateInlineStyles();
  }

  getImageExtension() {
    if (this.pictureData) {
      this.currentPictureExtension = getExtension(this.pictureData.src);
      return getExtension(this.pictureData.src);
    }

    return '';
  }

  updateInlineStyles() {
    let width = 'auto';
    let maxWidth = '100%';

    if (this.scale < 100) {
      width = `${this.scale}%`;
    }

    this.style = { width, maxWidth };
  }

  reset() {
    this.pictureData = null;
  }

  fallbackHandler(event: IPictureFallbackEvent) {
    if (isInPictureDataNotFallback(this.pictureData, this.fallback)) {
      this.className = !!this.currentPictureExtension 
        ? this.className.replace(this.currentPictureExtension, getExtension(this.fallback))
        : this.className += ` ${getExtension(this.fallback)}`;

      this.className += ' picture--fallback';
      this.pictureData.sources = [];
      this.pictureData.src = this.fallback;
    } else {
      this.className = this.className.replace('picture--fallback', 'picture--fail');
      if (!this.className.includes('picture--fail')) {
        this.className += ' picture--fail';
      }
      this.reset();
    }
  }
}
