import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NotImplementedModule } from './lib/ui-kit/not-implemented/not-implemented.module';
import { DocumentPanelModule } from './lib/panels/document-panel/document-panel.module';
import { TextPanelModule } from './lib/panels/text-panel/text-panel.module';
import { LinksPanelModule } from './lib/panels/links-panel/links-panel.module';
import { ImagePanelModule } from './lib/panels/image-panel/image-panel.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotImplementedModule,
    DocumentPanelModule,
    TextPanelModule,
    LinksPanelModule,
    ImagePanelModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
