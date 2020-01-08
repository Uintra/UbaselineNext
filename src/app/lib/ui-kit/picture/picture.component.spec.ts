import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { DebugElement, Component } from '@angular/core';
import { PictureComponent } from './picture.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslationsLoader } from 'src/app/service/translations-loader';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PictureModule } from './picture.module';

// REVIEW: As this component will be used through npm package. Please write tests.
// All added functionality has to be tested to determine regression.
fdescribe('PictureComponent', () => {
  let component: TestApp;
  let pictureComponent: PictureComponent;
  let lazyLoadedPictureComponent: PictureComponent;
  let fixture: ComponentFixture<TestApp>;
  let pictureEl: DebugElement;
  let imageEl: DebugElement;
  let sourceEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestApp ],
      imports: [
        PictureModule,
        LazyLoadImageModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateModule,
            deps: [HttpClient],
            useClass: TranslationsLoader},
        }),
      ],
      providers: [
        TranslateModule,
        TranslateLoader
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestApp);
    component = fixture.componentInstance;
    pictureComponent = fixture.debugElement.query(By.css('picture[ubl-picture]')).componentInstance;
    lazyLoadedPictureComponent = fixture.debugElement.query(By.css('picture[lazy]')).componentInstance;
    pictureEl = fixture.debugElement.query(By.css('picture'));
    imageEl = fixture.debugElement.query(By.css('img'));
  });

  it('should create', () => {
    expect(pictureEl).toBeTruthy();
  });

  it('should work with regular data and with string data', () => {
    pictureComponent.data = regularData;
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('img'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('img')).nativeElement.src).toBe(regularData.src);
    pictureComponent.data = regularStringData;
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('img'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('img')).nativeElement.src).toBe(regularStringData);
  });

  it('no image if there is no data and fallback', () => {
    pictureComponent.data = undefined;
    pictureComponent.fallback = undefined;
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('img'))).toBeFalsy();
    expect(pictureEl.nativeElement.childNodes[pictureEl.nativeElement.childNodes.length - 1].textContent.trim()).toBe('image.NoImage');
  });

  it('has to have image if it has data', () => {
    pictureComponent.data = regularData;
    pictureComponent.fallback = regularStringData;
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('img'))).toBeTruthy();
  });

  it('has to have image if it corrupted data and fallback, and have fallback in src; no image if fallback also corrupted', () => {
    pictureComponent.data = corruptedData;
    pictureComponent.fallback = regularStringData;    
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    fixture.debugElement.query(By.css('img')).triggerEventHandler('error', {});
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('img'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('img')).nativeElement.src).toBe(regularStringData);
    fixture.debugElement.query(By.css('img')).triggerEventHandler('error', {});
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('img'))).toBeFalsy();
  });

  it('has to have image if it has no data but fallback', () => {
    pictureComponent.data = undefined;
    pictureComponent.fallback = regularStringData;  
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('img'))).toBeTruthy();
  });

  it('should use custom ratio on fallback', () => {
    pictureComponent.data = undefined;
    pictureComponent.fallback = regularStringData;
    pictureComponent.ratio = 2;
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    expect(pictureEl.nativeElement.style.paddingBottom).toBe('50%');
    expect(pictureEl.nativeElement.className).toContain('picture--ratio');
  });

  it('should use custom ratio on data', () => {
    pictureComponent.data = regularData;
    pictureComponent.fallback = regularStringData;
    pictureComponent.ratio = 0.5;
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    expect(pictureEl.nativeElement.style.paddingBottom).toBe('200%');
    expect(pictureEl.nativeElement.className).toContain('picture--ratio');
  });

  it('should have proper classNames depending on image extension', () => {
    pictureComponent.fallback = regularStringData;
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    expect(pictureEl.nativeElement.className).toContain('picture');
    pictureComponent.fallback = 'https://picsum.photos/200/300.png';
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    expect(pictureEl.nativeElement.className).toContain('picture--png');
    pictureComponent.fallback = 'https://picsum.photos/200/300.svg';
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    expect(pictureEl.nativeElement.className).toContain('picture--svg');
  });

  it("in case of corrupted data should change class to fallback's extension", () => {
    pictureComponent.data = corruptedData;
    pictureComponent.fallback = 'https://picsum.photos/200/300.gif';
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    fixture.debugElement.query(By.css('img')).triggerEventHandler('error', {});
    fixture.detectChanges();
    expect(pictureEl.nativeElement.className).toContain('picture--gif');
  });

  it('should have proper className if fallback used', () => {
    pictureComponent.fallback = regularStringData;
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    expect(pictureEl.nativeElement.className).toContain('picture--fallback');
  });

  it("in case of corrupted data or no data at all should have class picture--fail", () => {
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    expect(pictureEl.nativeElement.className).toContain('picture--fail');
    pictureComponent.data = corruptedData;
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    fixture.debugElement.query(By.css('img')).triggerEventHandler('error', {});
    fixture.detectChanges();
    expect(pictureEl.nativeElement.className).toContain('picture--fail');
  });

  it('should use lazy loading if has attribute lazy', () => {
    fixture.debugElement.query(By.css('picture[lazy]')).componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(lazyLoadedPictureComponent.isLazyLoading).toBeTruthy();
  });

  it("should use scale if it's provided" , () => {
    pictureComponent.data = regularData;
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('img')).nativeElement.style.width).toBe('auto');
    pictureComponent.scale = 50;
    pictureComponent.ngOnInit();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('img')).nativeElement.style.width).toBe('50%');
  });
});

@Component({
  selector: 'test-app',
  template: `
    <picture ubl-picture></picture>
    <picture ubl-picture lazy></picture>
  `
})
class TestApp {
}

const regularData = { 
  "src":"https://picsum.photos/400/600",
  "alt":"asddsa",
  "width":960,
  "height":640,
  "sources":[ 
    { 
        "media":"",
        "srcSet":"/media/hf2bjdoj/fall-1072821_960_720.jpg"
    },
    { 
        "media":"(min-width: 1024px)",
        "srcSet":"/media/hf2bjdoj/fall-1072821_960_720.jpg?center=0.5,0.5&mode=crop&width=200&height=300"
    }
  ]
}

const corruptedData = { 
  "src":"https://picsum.photos/200/300corrupted",
  "alt":"asddsa",
  "width":960,
  "height":640,
  "sources":[ 
    { 
        "media":"",
        "srcSet":"https://picsum.photos/200/300corrupted"
    },
    { 
        "media":"(min-width: 1024px)",
        "srcSet":"https://picsum.photos/200/300corrupted?center=0.5,0.5&mode=crop&width=200&height=300"
    }
  ]
}

const regularStringData = 'https://picsum.photos/200/300';